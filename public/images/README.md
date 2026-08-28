# Sistema de imagens

Este diretório concentra todas as fotografias institucionais da landing page. A troca de imagens para uma clínica real é feita em **dois lugares apenas**:

1. Substituir os arquivos dentro desta pasta (`public/images/...`).
2. Atualizar os caminhos e os textos alternativos (`alt`) correspondentes em `data/clinic.ts`.

Nenhum componente (`Hero.tsx`, `About.tsx`, `Team.tsx`, `Location.tsx`) precisa ser tocado — todos leem as imagens a partir de `data/clinic.ts`.

## Estrutura

```
public/images/
├── hero/
│   └── hero-clinic.jpg       → Seção Hero (topo da página)
├── about/
│   └── about-clinic.jpg      → Seção "A Clínica"
├── team/
│   ├── team-ricardo.jpg      → Foto do profissional "dr-carvalho"
│   └── team-beatriz.jpg      → Foto do profissional "dra-almeida"
└── location/
    └── clinic-exterior.jpg   → Seção "Localização"
```

## Onde cada imagem é referenciada em `data/clinic.ts`

- **Hero:** `clinic.images.hero` (`src` + `alt`)
- **A Clínica:** `clinic.images.about` (`src` + `alt`)
- **Localização:** `clinic.images.location` (`src` + `alt`)
- **Equipe:** cada item de `clinic.professionals[]` tem um campo opcional `image` (`src` + `alt`). Se um profissional não tiver `image`, o card volta automaticamente para o placeholder elegante com as iniciais do nome — não é necessário remover o profissional nem preencher com uma imagem genérica.

## Como trocar a foto de um profissional

Em `data/clinic.ts`, dentro do objeto do profissional:

```ts
{
  id: "dr-carvalho",
  name: "Dr. Ricardo Carvalho",
  role: "Clínico Geral",
  bio: "...",
  image: {
    src: "/images/team/team-ricardo.jpg",
    alt: "Descreva a foto real aqui",
  },
}
```

Basta colocar o novo arquivo em `public/images/team/` e apontar `src` para ele. Para remover a foto de um profissional (voltando ao placeholder de iniciais), apague o campo `image` inteiro.

## Formato e proporção recomendados

| Imagem | Proporção do container | Orientação da foto de origem | Peso recomendado |
|---|---|---|---|
| Hero | 4:5 (mobile) / 3:4 (desktop) | Retrato, ou paisagem com o assunto centralizado | até ~300 KB |
| A Clínica | 16:10 | Paisagem | até ~250 KB |
| Equipe (destaque) | 3:4 | Retrato, rosto enquadrado no terço superior | até ~200 KB |
| Equipe (secundário) | 3:4 (avatar pequeno, ~112px) | Retrato | até ~150 KB |
| Localização | 4:3 (mobile) / 16:12 (desktop) | Paisagem | até ~250 KB |

- Formato: JPEG ou WebP. O Next.js otimiza e converte automaticamente para WebP/AVIF em produção — não é necessário pré-converter os arquivos.
- Todas as imagens usam `object-fit: cover`, então pequenos desalinhamentos de proporção são absorvidos automaticamente; evite apenas fotos muito diferentes da proporção do container (ex.: um quadrado apertado para o slot 16:10 do About).
- Para fotos de equipe, prefira enquadramento com a cabeça e os ombros bem centralizados — o corte automático prioriza o centro da imagem.

## Imagens atuais (temporárias)

As 5 fotografias atualmente neste diretório são imagens de banco (Pexels, licença gratuita para uso comercial) usadas **apenas como demonstração visual** do layout. Elas **não pertencem à clínica real** e devem ser substituídas por fotografias verdadeiras da clínica, do espaço e da equipe antes de qualquer publicação.
