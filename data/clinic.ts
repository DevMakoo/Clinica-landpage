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

export interface ClinicProfessional {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
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
    },
    {
      id: "dra-almeida",
      name: "Dra. Beatriz Almeida",
      role: "Cardiologista",
      bio: "Especialista em saúde cardiovascular e check-ups executivos.",
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
