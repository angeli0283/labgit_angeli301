import * as yup from "yup";

export const curriculoSchema = yup.object({
  nome: yup.string().required("Nome é obrigatório").min(3, "Informe pelo menos 3 caracteres"),
  cargo: yup.string().required("Cargo desejado é obrigatório").min(3, "Informe pelo menos 3 caracteres"),
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  telefone: yup.string().required("Telefone é obrigatório").min(14, "Telefone inválido"),
  cpf: yup.string().required("CPF é obrigatório").min(14, "CPF inválido"),
  resumo: yup.string().required("Resumo profissional é obrigatório").min(30, "Escreva pelo menos 30 caracteres"),
  experiencias: yup
    .array(
      yup.object({
        cargo: yup.string().required("Cargo é obrigatório"),
        empresa: yup.string().required("Empresa é obrigatória"),
        periodo: yup.string().required("Período é obrigatório"),
        descricao: yup.string().required("Descrição é obrigatória").min(10, "Escreva pelo menos 10 caracteres"),
      })
    )
    .min(1, "Adicione ao menos uma experiência"),
  formacoes: yup
    .array(
      yup.object({
        curso: yup.string().required("Curso é obrigatório"),
        instituicao: yup.string().required("Instituição é obrigatória"),
        periodo: yup.string().required("Período é obrigatório"),
      })
    )
    .min(1, "Adicione ao menos uma formação acadêmica"),
  habilidades: yup
    .array(yup.string().required("Habilidade é obrigatória").min(2, "Informe pelo menos 2 caracteres"))
    .min(1, "Adicione ao menos uma habilidade"),
});

export type CurriculoFormValues = yup.InferType<typeof curriculoSchema>;
