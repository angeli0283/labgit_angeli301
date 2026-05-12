export type Experiencia = {
  cargo: string;
  empresa: string;
  periodo: string;
  descricao: string;
};

export type Formacao = {
  curso: string;
  instituicao: string;
  periodo: string;
};

export type Curriculo = {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  cpf: string;
  resumo: string;
  experiencias: Experiencia[];
  formacoes: Formacao[];
  habilidades: string[];
  imagem: string;
};

export const CURRICULOS_KEY = "curriculos-v1";

export const CURRICULOS_MOCK: Curriculo[] = [
  {
    id: "1",
    nome: "Mariana Silva",
    cargo: "Desenvolvedora Front-end",
    email: "mariana.silva@example.com",
    telefone: "(11) 98765-4321",
    cpf: "123.456.789-10",
    resumo:
      "Profissional com 5 anos de experiência em aplicações web responsivas e foco em UX.",
    experiencias: [
      {
        cargo: "Engenheira de Front-end",
        empresa: "Agile Labs",
        periodo: "2022 - Atual",
        descricao:
          "Desenvolvimento de interfaces com React e TypeScript para soluções de RH.",
      },
      {
        cargo: "Desenvolvedora Web",
        empresa: "Studio Digital",
        periodo: "2019 - 2022",
        descricao:
          "Criação de painéis administrativos e apps mobile-first com atenção a acessibilidade.",
      },
    ],
    formacoes: [
      {
        curso: "Sistemas de Informação",
        instituicao: "Universidade Estadual",
        periodo: "2016 - 2019",
      },
    ],
    habilidades: ["React", "Next.js", "Tailwind", "UX", "TypeScript"],
    imagem: "/candidato-1.svg",
  },
  {
    id: "2",
    nome: "Roberto Almeida",
    cargo: "Analista de Dados",
    email: "roberto.almeida@example.com",
    telefone: "(21) 99876-5432",
    cpf: "987.654.321-00",
    resumo:
      "Especialista em análise de métricas e dashboards, com experiência em times de produto.",
    experiencias: [
      {
        cargo: "Analista de BI",
        empresa: "DataWorks",
        periodo: "2021 - Atual",
        descricao:
          "Implementação de relatórios e métricas de desempenho com foco em decisão estratégica.",
      },
      {
        cargo: "Consultor de Inteligência",
        empresa: "Insight Consulting",
        periodo: "2018 - 2021",
        descricao:
          "Estruturação de bases de dados e automação de indicadores para clientes de varejo.",
      },
    ],
    formacoes: [
      {
        curso: "Engenharia de Produção",
        instituicao: "Centro Universitário",
        periodo: "2015 - 2018",
      },
    ],
    habilidades: ["Power BI", "SQL", "Python", "Visualização", "Processos"],
    imagem: "/candidato-2.svg",
  },
];

export function getCurriculosFromStorage(): Curriculo[] {
  if (typeof window === "undefined") {
    return CURRICULOS_MOCK;
  }

  try {
    const raw = window.localStorage.getItem(CURRICULOS_KEY);
    if (!raw) {
      window.localStorage.setItem(CURRICULOS_KEY, JSON.stringify(CURRICULOS_MOCK));
      return CURRICULOS_MOCK;
    }

    const parsed = JSON.parse(raw) as Curriculo[];
    return parsed.length ? parsed : CURRICULOS_MOCK;
  } catch {
    return CURRICULOS_MOCK;
  }
}

export function saveCurriculosToStorage(curriculos: Curriculo[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CURRICULOS_KEY, JSON.stringify(curriculos));
}

export function findCurriculoById(id: string): Curriculo | undefined {
  return getCurriculosFromStorage().find((item) => item.id === id);
}
