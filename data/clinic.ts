export interface ClinicHours {
  day: string;
  open: string;
  close: string;
}

export interface ClinicService {
  id: string;
  name: string;
  description: string;
}

/**
 * Uma imagem com o alt text que a acompanha. O alt vive junto do dado (não é
 * derivado no componente) porque descreve o conteúdo real da fotografia —
 * quando a foto for trocada por uma nova clínica, o alt deve ser trocado
 * junto.
 */
export interface ClinicImage {
  src: string;
  alt: string;
}

/** Fotografias institucionais usadas nas seções Hero, A Clínica e Localização. */
export interface ClinicImages {
  hero: ClinicImage;
  about: ClinicImage;
  location: ClinicImage;
}

export interface ClinicProfessional {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Opcional: quando ausente, o cartão do profissional usa o placeholder de iniciais. */
  image?: ClinicImage;
}

export interface ClinicTestimonial {
  id: string;
  author: string;
  quote: string;
  role?: string;
}

export interface ClinicSocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

export interface ClinicData {
  name: string;
  specialty: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: ClinicHours[];
  images: ClinicImages;
  services: ClinicService[];
  professionals: ClinicProfessional[];
  testimonials: ClinicTestimonial[];
  social: ClinicSocialLinks;
}

export const clinic: ClinicData = {
  name: "Clínica Vitalis",
  specialty: "Clínica Médica Integrada",
  tagline: "Cuidado premium, humano e de confiança.",
  phone: "+55 11 4000-0000",
  whatsapp: "+55 11 90000-0000",
  email: "contato@clinicavitalis.com.br",
  address: "Av. Brigadeiro Faria Lima, 1500 - São Paulo, SP",
  hours: [
    { day: "Segunda a Sexta", open: "08:00", close: "19:00" },
    { day: "Sábado", open: "09:00", close: "13:00" },
  ],
  images: {
    hero: {
      src: "/images/hero/hero-clinic.jpg",
      alt: "Médico sorridente trabalhando em um ambiente clínico claro e acolhedor",
    },
    about: {
      src: "/images/about/about-clinic.jpg",
      alt: "Sala de espera moderna e minimalista, com poltronas estofadas e acabamento em madeira",
    },
    location: {
      src: "/images/location/clinic-exterior.jpg",
      alt: "Fachada branca e minimalista de edifício, com janelas simétricas sob céu azul",
    },
  },
  services: [
    {
      id: "checkup",
      name: "Check-up Executivo",
      description:
        "Avaliação clínica completa com foco em prevenção e longevidade.",
    },
    {
      id: "cardiologia",
      name: "Cardiologia",
      description:
        "Acompanhamento cardiovascular com tecnologia diagnóstica avançada.",
    },
    {
      id: "nutrologia",
      name: "Nutrologia",
      description:
        "Planos nutricionais personalizados para saúde e performance.",
    },
  ],
  professionals: [
    {
      id: "dr-carvalho",
      name: "Dr. Ricardo Carvalho",
      role: "Clínico Geral",
      bio: "Mais de 15 anos de experiência em medicina preventiva.",
      image: {
        src: "/images/team/team-ricardo.jpg",
        alt: "Retrato profissional em ambiente clínico, jaleco branco e estetoscópio",
      },
    },
    {
      id: "dra-almeida",
      name: "Dra. Beatriz Almeida",
      role: "Cardiologista",
      bio: "Especialista em saúde cardiovascular e check-ups executivos.",
      image: {
        src: "/images/team/team-beatriz.jpg",
        alt: "Retrato profissional em estúdio, óculos e jaleco branco, sorriso acolhedor",
      },
    },
  ],
  testimonials: [
    {
      id: "t1",
      author: "Marina Souza",
      quote:
        "Atendimento excepcional, ambiente acolhedor e uma equipe extremamente atenciosa.",
      role: "Paciente",
    },
  ],
  social: {
    instagram: "https://instagram.com/clinicavitalis",
    linkedin: "https://linkedin.com/company/clinicavitalis",
  },
};
