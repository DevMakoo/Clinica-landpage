# AUDITORIA COMPLETA — Clinic Landing (Clínica Vitalis)

**Data:** 2026-08-28
**Escopo:** `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `data/clinic.ts`, `components/clinic/*`, `components/ui/button.tsx`, `package.json`, `next.config.ts`, `public/*`
**Método:** leitura de código + `npx tsc --noEmit` + `npx eslint .` + verificação visual no navegador (desktop 1440px, tablet 768–1024px, mobile ~500px, incluindo teste de contraste calculado e checagem de landmarks/heading via JS no DOM renderizado). Nenhum arquivo de código foi alterado.

---

## 🔴 CRÍTICO

### 1. Header quebra e sobrepõe conteúdo em larguras de tablet (768px–~870px)
- **Arquivo:** `components/clinic/Navbar.tsx` (nav desktop, linhas 49–69) + `app/globals.css` (Hero usa `pt-28 md:pt-36` fixo)
- **Localização:** breakpoint `md` (≥768px) até ~870px de largura — cobre iPad portrait (768px), iPad Air (820px) e iPad Pro 11" portrait (834px), ou seja, os tablets mais comuns do mercado.
- **Problema:** o Tailwind `md:flex` ativa o nav completo (logo + 5 links + botão "Agendar consulta") já a partir de 768px, mas não há espaço horizontal suficiente até ~880px. Logo, links e botão quebram em 2 linhas, e a altura do `<header>` (fixed) salta de ~82px para ~105px. Testado e confirmado via DOM: em 768px, 800px, 818px e 850px o `header.getBoundingClientRect().height` fica em 104–105px; em 884px+ volta a 82px.
- **Impacto:** como o header é `fixed` e o `<section id="inicio">` do Hero usa padding-top fixo (`pt-28`/`md:pt-36`) pensado para um header de altura única, o header mais alto passa a sobrepor visualmente o título H1 ("Cuidado que começa com confiança.") — confirmado no screenshot em 818px, onde o topo do H1 fica parcialmente escondido atrás do header. Isso acontece exatamente na faixa de tablet pedida na auditoria.
- **Recomendação:** ou (a) antecipar o colapso para o menu mobile em uma breakpoint maior (ex.: usar `lg:flex` em vez de `md:flex` e mostrar o hambúrguer até ~1024px), ou (b) reduzir gap/padding dos links e permitir `whitespace-nowrap` com truncamento controlado, ou (c) medir a altura real do header (ex. `ResizeObserver`) e aplicar como `scroll-margin-top`/padding dinâmico em vez de valor fixo.

### 2. Título e metadados da página não usam o nome real da clínica
- **Arquivo:** `app/layout.tsx` (linhas 16–29)
- **Localização:** `metadata.title.default = "Clínica Premium"`, `metadata.openGraph.title = "Clínica Premium"` — hardcoded, não vem de `data/clinic.ts`.
- **Problema:** todo o resto do site (Navbar, Footer, Hero, depoimentos, FAQ) usa `clinic.name` = **"Clínica Vitalis"**. Confirmado no navegador: a aba do Chrome e o `document.title` mostram **"Clínica Premium"**, enquanto o conteúdo visível da página inteira fala em "Clínica Vitalis".
- **Impacto:** resultado de busca do Google, título da aba e preview de compartilhamento (WhatsApp/redes sociais) mostrarão um nome genérico e diferente da marca real — quebra de confiança/consistência de marca logo no primeiro ponto de contato (SEO + compartilhamento).
- **Recomendação:** trocar para `title: { default: clinic.name, template: `%s | ${clinic.name}` }` e usar `clinic.tagline`/`clinic.specialty` na description, importando `clinic` de `@/data/clinic` em `layout.tsx`.

---

## 🟠 IMPORTANTE

### 3. Ausência de `robots.txt`, `sitemap.xml`, `canonical` e `og:image`/`og:url`
- **Arquivo:** `app/` (faltam `robots.ts`, `sitemap.ts`; `app/layout.tsx` sem `canonical`, `metadataBase`, `openGraph.images`/`url`)
- **Problema:** confirmado por busca no projeto — não existe nenhum arquivo `robots*`/`sitemap*` em `app/` nem em `public/`. `openGraph` não define `images` nem `url`, e não há `metadataBase`.
- **Impacto:** motores de busca não recebem sinalização de indexação/sitemap; compartilhamentos em redes sociais não mostram imagem de preview; URLs relativas de OG podem falhar silenciosamente sem `metadataBase`.
- **Recomendação:** adicionar `app/robots.ts` e `app/sitemap.ts` (App Router), definir `metadataBase: new URL("https://...")`, `alternates.canonical` e `openGraph.images` assim que houver domínio e imagem definitivos.

### 4. Dados de contato fictícios com padrão "número de teste"
- **Arquivo:** `data/clinic.ts` (linhas 53–55)
- **Localização:** `phone: "+55 11 4000-0000"`, `whatsapp: "+55 11 90000-0000"`, `email: "contato@clinicavitalis.com.br"`
- **Problema:** os números usam sequências "0000" típicas de placeholder e o domínio de e-mail muito provavelmente não existe/não recebe e-mails reais.
- **Impacto:** todos os CTAs de conversão (WhatsApp, telefone, e-mail, e as respostas do FAQ que citam esses dados) levam a canais que não funcionam de verdade — risco alto se publicado assim.
- **Recomendação:** listar como pendência obrigatória de pré-lançamento (ver seção Placeholders).

### 5. Placeholder de mapa anunciando "em breve"
- **Arquivo:** `components/clinic/Location.tsx` (linhas 133–145)
- **Problema:** o bloco reservado ao mapa exibe literalmente o texto **"MAPA EM BREVE"** para o visitante final, não é só um placeholder de design interno.
- **Impacto:** usuário final vê uma mensagem de "funcionalidade incompleta" em produção.
- **Recomendação:** substituir por iframe do Google Maps (usando `clinic.address`) antes de publicar; o link "Ver no mapa" já existe e funciona corretamente como fallback.

### 6. Ano do copyright fixo no código
- **Arquivo:** `components/clinic/Footer.tsx` (linha 144)
- **Localização:** `© 2026 {clinic.name}`
- **Problema:** o ano "2026" está hardcoded como string, não calculado dinamicamente.
- **Impacto:** a partir de janeiro de 2027 o rodapé mostrará uma data errada até alguém lembrar de atualizar manualmente o código.
- **Recomendação:** `© {new Date().getFullYear()} {clinic.name}`.

### 7. SVGs de boilerplate do `create-next-app` não utilizados
- **Arquivo:** `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`
- **Problema:** nenhum desses arquivos é referenciado em nenhum componente (confirmado por busca no código) — são os ícones padrão de exemplo do template Next.js.
- **Impacto:** lixo de scaffold no repositório; sem impacto de performance real (não são baixados pelo cliente), mas polui `public/` e pode confundir quem for adicionar assets reais da clínica.
- **Recomendação:** remover os 5 arquivos.

### 8. Favicon é o padrão do Next.js, não da clínica
- **Arquivo:** `app/favicon.ico`
- **Problema:** o arquivo tem exatamente 25.931 bytes, o tamanho padrão do favicon gerado pelo `create-next-app` (ícone do Next/Vercel), sem indício de ter sido substituído pela marca da clínica.
- **Impacto:** aba do navegador e favoritos mostram um ícone genérico, não a identidade "Clínica Premium/Vitalis".
- **Recomendação:** substituir por favicon com a marca real assim que houver logo definido.

### 9. Componente `Button` do shadcn nunca é usado
- **Arquivo:** `components/ui/button.tsx`
- **Problema:** busca por `from "@/components/ui/button"` no projeto não retorna nenhum resultado — todos os CTAs do site usam `<a>`/`<Link>` estilizados manualmente com classes Tailwind repetidas em vez desse componente.
- **Impacto:** código morto no repositório; também é uma oportunidade perdida de centralizar o estilo dos botões (ver duplicação no item 11).
- **Recomendação:** ou remover o arquivo (se a decisão for manter botões como `<a>` estilizado), ou migrar os CTAs para usá-lo, evitando as duas abordagens convivendo.

---

## 🟡 POLIMENTO

### 10. Constante `EASE` duplicada em 9 arquivos
- **Arquivo:** `Hero.tsx`, `Services.tsx`, `About.tsx`, `Team.tsx`, `Testimonials.tsx`, `FAQ.tsx`, `CTA.tsx`, `Location.tsx`, `Footer.tsx`
- **Problema:** `const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];` é copiada e colada em todos os componentes de seção.
- **Impacto:** baixo (funciona corretamente), mas qualquer ajuste futuro de curva de easing precisa ser replicado manualmente em 9 lugares — risco de inconsistência.
- **Recomendação:** extrair para `lib/motion.ts` (ex.: `export const EASE_OUT = [0.16,1,0.3,1] as const;`) e importar.

### 11. Lógica de link do WhatsApp duplicada em 5 arquivos
- **Arquivo:** `Navbar.tsx`, `Hero.tsx`, `Services.tsx`, `CTA.tsx`, `Footer.tsx`
- **Problema:** o padrão `clinic.whatsapp.replace(/\D/g, "")` + montagem de `https://wa.me/...` (às vezes com mensagem via `encodeURIComponent`) é reimplementado em cada arquivo.
- **Recomendação:** centralizar em um helper `lib/whatsapp.ts` (`buildWhatsappHref(message?: string)`), reduzindo duplicação e risco de divergência de formato.

### 12. Sem scroll suave nos links âncora
- **Arquivo:** `app/globals.css`
- **Problema:** não há `scroll-behavior: smooth` no `html`; o único lugar que menciona `scroll-behavior` é a regra de `prefers-reduced-motion` forçando `auto`. Ou seja, mesmo para quem não pediu movimento reduzido, o clique nos links do menu (Navbar/Footer) causa um salto instantâneo em vez de rolagem suave — confirmado ao clicar em "FAQ" no menu.
- **Impacto:** pequeno, é uma questão de polimento de experiência, não de funcionalidade (o link funciona e leva ao lugar certo).
- **Recomendação:** adicionar `html { scroll-behavior: smooth; }` fora do bloco de reduced-motion (que já cuida de desativar quando necessário).

### 13. `shadcn` como dependência de produção
- **Arquivo:** `package.json` (linha 20)
- **Problema:** `"shadcn": "^4.19.0"` está em `dependencies`. É majoritariamente uma CLI de scaffolding; ainda que `app/globals.css` importe `shadcn/tailwind.css` em build-time, o pacote não é usado em runtime do lado do cliente.
- **Impacto:** mínimo (não afeta bundle final do cliente, só a instalação), mas é uma inconsistência de organização de dependências.
- **Recomendação:** avaliar mover para `devDependencies` caso o import de CSS não exija resolução em runtime de produção — verificar antes de mudar, pois `next build` pode depender dele estar em `dependencies` dependendo do ambiente de deploy.

### 14. Copy "Conhecer serviço" abre direto o WhatsApp
- **Arquivo:** `components/clinic/Services.tsx` (linhas 93–100)
- **Problema:** o texto do link sugere "saiba mais" mas a ação real é abrir uma conversa de WhatsApp pré-preenchida.
- **Impacto:** leve dissonância de expectativa; não é um erro funcional, e para uma landing de conversão pode até ser desejado.
- **Recomendação:** opcional — ajustar copy para algo como "Falar sobre {serviço}" para alinhar expectativa com a ação.

### 15. Apenas 1 depoimento cadastrado
- **Arquivo:** `data/clinic.ts` (linhas 95–103), `components/clinic/Testimonials.tsx`
- **Problema:** com um único item em `testimonials`, `hasMultiple` é `false` e os controles de navegação (setas/contador) nunca aparecem — o carrossel foi construído mas está subutilizado no estado atual dos dados.
- **Impacto:** nenhum bug (o componente lida corretamente com 0, 1 ou N itens), apenas observação de conteúdo incompleto.
- **Recomendação:** adicionar mais depoimentos reais antes do lançamento.

### 16. Toda a árvore de seções é `"use client"`
- **Arquivo:** todos em `components/clinic/*`
- **Problema:** todas as 10 seções são Client Components por causa do uso de `motion/react`, mesmo quando o conteúdo em si (textos, listas) poderia ser renderizado no servidor.
- **Impacto:** baixo/moderado — aumenta o JS enviado ao cliente mais do que o estritamente necessário; não foi observado impacto perceptível de performance nos testes (carregamento rápido, sem erros), mas é uma oportunidade de otimização.
- **Recomendação:** considerar, no futuro, separar conteúdo estático (Server Component) de um wrapper fino de animação (Client Component), especialmente em seções abaixo da dobra.

---

## 🟢 OK

- Contraste de cores testado matematicamente (fórmula WCAG) para todos os pares texto/fundo usados no site — **todos passam AA** (menor valor: 4.64:1 em texto secundário sobre fundo, a maioria acima de 6:1).
- `prefers-reduced-motion` tratado em duas camadas complementares: CSS global (`app/globals.css`) zera durações de transição/animação CSS, e `MotionConfig reducedMotion="user"` desativa as animações do Motion — sem conflito entre as duas.
- `:focus-visible` com outline visível aplicado globalmente; testado com navegação por Tab e o anel de foco aparece corretamente nos links do menu.
- Estrutura de headings correta: **1 único H1** (Hero), 7 H2 (um por seção), H3 nos cards — hierarquia coerente, confirmado via DOM (`document.querySelectorAll`).
- Landmarks semânticos presentes e nomeados: `<header>`, `<main>`, `<footer>` (x2, um sendo o `<footer>` de atribuição dentro do depoimento — uso semanticamente válido de footer aninhado), `<nav aria-label="Navegação principal">` e `<nav aria-label="Links do rodapé">` com labels distintos.
- Links externos (WhatsApp, redes sociais, Google Maps) usam `target="_blank" rel="noopener noreferrer"` corretamente e incluem texto `sr-only` avisando "(abre em nova aba)" — boa prática de acessibilidade pouco comum de ver implementada.
- Nenhum erro ou warning no console do navegador, nem no terminal do `next dev`, durante toda a navegação testada.
- `npx tsc --noEmit` e `npx eslint .` rodaram **100% limpos**, sem nenhum erro ou warning.
- Nenhum overflow horizontal detectado em nenhuma largura testada (desktop 1440px, tablet 768–1024px, mobile ~500px) — verificado via `document.documentElement.scrollWidth` vs `window.innerWidth`.
- `data/clinic.ts` é bem tipado (interfaces `ClinicService`, `ClinicProfessional`, `ClinicTestimonial`, etc.) e todos os componentes consomem os dados de lá — nenhuma string de conteúdo de negócio hardcoded fora do arquivo de dados (exceto o título/OG do item 🔴 2).
- Menu mobile (Base UI `Dialog`) funciona corretamente: abre com o ícone hambúrguer, fecha ao clicar em um link (com navegação para a âncora correta), fecha pelo botão "X", tem backdrop com blur — testado e confirmado (a primeira captura de tela que parecia "quebrada" era apenas um frame no meio da transição CSS de 300ms).
- FAQ com `Accordion` acessível (Base UI): expande/recolhe corretamente ao clicar, ícone gira, altura anima via CSS var.
- Fontes carregadas via `next/font/google` (self-hosted, sem FOUT perceptível) e renderizam corretamente todos os caracteres acentuados do português (ã, ç, é, etc.).

---

## 🎨 DESIGN SYSTEM

- Paleta consistente e com boa identidade "premium": verde-petróleo (`--primary: #123c36`), dourado de destaque (`--gold: #c9a878`), fundo levemente off-white (`--background: #f7f8f5`) — usada de forma coerente em todas as seções (linhas divisórias douradas, textos em `text-primary`, CTAs em `bg-primary`).
- Tipografia com contraste claro entre `Playfair Display` (headings, editorial/serif) e `Inter` (corpo, sans) — hierarquia `text-h1`/`text-h2`/`text-h3`/`text-body*` definida via `@utility` no Tailwind v4, usada de forma consistente em todas as seções.
- `border-radius` consistente: cards e imagens usam `rounded-xl`/`rounded-lg`, botões usam `rounded-full` — padrão repetido sem exceções encontradas.
- `shadow-soft` (`0 10px 30px rgba(18,60,54,.08)`) usado de forma uniforme em cards, painéis de imagem e depoimentos.
- Grid de container e espaçamento vertical (`section-y`/`pt-18 pb-18 md:pt-30 md:pb-30`) padronizados via `@utility`, dando ritmo consistente entre seções.
- Único ponto fora do padrão: contraste de borda muito baixo (`--border: #dde3df` sobre `--background: #f7f8f5`, ~1.22:1) — aceitável por ser puramente decorativo, mas cards ficam quase sem borda perceptível em monitores com brilho alto (ver item 🟡 relacionado, não listado separadamente por ser subjetivo).

## 📱 RESPONSIVIDADE

- **Desktop (1440px):** sem problemas — todas as seções renderizam corretamente, grids de 3 colunas (Serviços), 5 colunas (Equipe) funcionam.
- **Tablet (768–~870px):** 🔴 **quebra crítica do header** — ver item 1. Fora do header, o restante do conteúdo (grids, textos, cards) se adapta bem nessa faixa.
- **Tablet maior (884–1024px):** sem problemas, header volta a uma linha.
- **Mobile (~500px, menor largura testável pela ferramenta neste ambiente Windows):** sem overflow horizontal, sem quebra de texto, grids colapsam para 1 coluna corretamente, menu mobile funcional. *Observação: a ferramenta de automação de navegador neste ambiente não permitiu redimensionar a janela para exatamente 390px (mínimo obtido foi ~500px de `innerWidth`); o layout nessa largura, porém, já está abaixo do breakpoint `sm`/`md` e não mostrou nenhum problema, então é razoável esperar comportamento equivalente em 390px — mas não foi 100% confirmado nesse valor exato.*
- Navbar mobile (hambúrguer + painel lateral) e FAQ (accordion) testados e funcionando em mobile.

## ♿ ACESSIBILIDADE

- Contraste AA confirmado (ver 🟢).
- Foco de teclado visível globalmente.
- `aria-label` presente em botões só-ícone (menu hambúrguer, fechar menu, setas do carrossel de depoimentos, ícones decorativos com `aria-hidden`).
- Único reparo sugerido: os dois `<footer>` da página (rodapé principal + atribuição do depoimento) não têm `aria-label` diferenciando-os para tecnologia assistiva que liste landmarks — uso tecnicamente válido do HTML, mas poderia ganhar um `aria-label` no `<footer>` de atribuição do depoimento para maior clareza (nível polimento, não incluído nas listas de severidade por ser opcional).

## ⚡ PERFORMANCE

- Nenhum erro de build, nenhum warning de lint/TS.
- Fontes otimizadas via `next/font`.
- Todas as seções são Client Components devido ao uso extensivo de `motion/react` (ver item 🟡 16) — não há evidência de impacto real no carregamento observado (páginas carregaram em ~20-100ms após o build inicial em dev), mas é a maior oportunidade de otimização estrutural do projeto.
- Ainda não há imagens reais (todas são placeholders `role="img"`), então não há o que otimizar com `next/image` agora — os comentários no código já deixam a intenção correta documentada para quando houver fotos reais.

## 🔍 SEO

- `lang="pt-BR"` correto no `<html>`.
- Title/description/OG genéricos e divergentes do nome real da clínica (🔴 item 2).
- Sem `robots.ts`, `sitemap.ts`, `canonical`, `metadataBase`, `og:image` (🟠 item 3).
- Hierarquia de headings correta (bom para SEO on-page).
- Texto semântico e em português nativo em todo o conteúdo (bom para indexação local).

## 🧹 PLACEHOLDERS

**Imagens placeholder:**
- Hero: bloco com inicial da clínica (`role="img"`, comentário no código já orienta a troca).
- About: bloco com nome da especialidade (`role="img"`, mesmo padrão).
- Team: avatares com iniciais (`Dr. Ricardo Carvalho` → "RC", `Dra. Beatriz Almeida` → "BA").
- Location: bloco "MAPA EM BREVE" (texto de placeholder visível ao usuário final).
- Favicon padrão do Next.js (não é foto, mas é ícone-placeholder).
- 5 SVGs de boilerplate não utilizados em `public/`.

**Textos/dados fictícios (`data/clinic.ts`):**
- Nome, tagline, especialidade — fictícios ("Clínica Vitalis").
- Telefone/WhatsApp com padrão de número de teste ("...0000", "...90000-0000").
- E-mail de domínio provavelmente inexistente (`contato@clinicavitalis.com.br`).
- Endereço fictício (rua real de São Paulo, número/clínica inventados).
- 2 profissionais fictícios com bios genéricas.
- 1 depoimento fictício ("Marina Souza").
- Links sociais para handles que provavelmente não existem (`instagram.com/clinicavitalis`, `linkedin.com/company/clinicavitalis`).

**Elementos "em breve":**
- Texto "MAPA EM BREVE" em `Location.tsx`.

**Conteúdo que obrigatoriamente precisa ser substituído antes de publicar para uma clínica real:**
1. Nome, telefone, WhatsApp, e-mail e endereço em `data/clinic.ts`.
2. Título/description/OG em `app/layout.tsx` (usar o nome real).
3. Fotos reais no lugar dos placeholders de Hero, About e Team.
4. Embed real do Google Maps em `Location.tsx`.
5. Depoimentos e equipe reais.
6. Favicon com a marca real.
7. Links sociais reais (ou remover os que não existirem).
8. Domínio definitivo para `metadataBase`/`canonical`/sitemap.

## 🏗️ ARQUITETURA

- Boa separação `data/clinic.ts` (conteúdo) × `components/clinic/*` (apresentação) × `app/` (roteamento/layout) — modelo data-driven bem aplicado, exceto pelo título da página (🔴 item 2).
- Tipagem forte em toda a camada de dados (`ClinicData`, `ClinicService`, etc.).
- Duplicação pontual de lógica (EASE, montagem de link do WhatsApp) — itens 🟡 10 e 🟡 11.
- Componente `Button` do shadcn presente mas não integrado ao padrão real de botões do site — item 🟠 9.
- Nenhum bug funcional encontrado além da quebra de header em tablet.
- `next.config.ts` habilita `reactCompiler: true`, coerente com `babel-plugin-react-compiler` em devDependencies — configuração consistente.

---

## ORDEM DE CORREÇÃO

1. **[🔴]** Corrigir a quebra do header/nav em larguras de tablet (768–870px) — afeta usabilidade real em dispositivos comuns.
2. **[🔴]** Alinhar título/OG/description em `app/layout.tsx` ao nome real da clínica (`clinic.name`).
3. **[🟠]** Substituir dados de contato fictícios (telefone, WhatsApp, e-mail, endereço) por dados reais antes de qualquer publicação.
4. **[🟠]** Implementar mapa real (remover "MAPA EM BREVE").
5. **[🟠]** Adicionar `robots.ts`, `sitemap.ts`, `metadataBase`, `canonical`, `og:image`.
6. **[🟠]** Trocar favicon padrão pela marca real.
7. **[🟠]** Corrigir ano de copyright para cálculo dinâmico.
8. **[🟠]** Remover SVGs de boilerplate não utilizados em `public/`.
9. **[🟠]** Decidir sobre `components/ui/button.tsx` (usar ou remover).
10. **[🟡]** Extrair `EASE` para um módulo compartilhado.
11. **[🟡]** Extrair helper de link do WhatsApp compartilhado.
12. **[🟡]** Adicionar `scroll-behavior: smooth` para os anchors.
13. **[🟡]** Revisar `shadcn` em `dependencies` vs `devDependencies`.
14. **[🟡]** Ajustar copy de "Conhecer serviço" (opcional).
15. **[🟡]** Adicionar mais depoimentos reais.
16. **[🟡]** Avaliar redução de `"use client"` nas seções sem interatividade própria.

---

*Relatório gerado por auditoria automatizada (leitura de código + verificação visual em navegador). Nenhum arquivo de código do projeto foi modificado durante esta análise.*
