"use client";

import { useEffect, useState } from "react";
import { Resolver, useFieldArray, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import { toast } from "sonner";
import { curriculoSchema, CurriculoFormValues } from "../../../../../lib/validators";
import { Curriculo, getCurriculosFromStorage, saveCurriculosToStorage } from "../../../../../lib/curriculos";
import Button from "../../../../componentes/ui/button";
import Input from "../../../../componentes/ui/input";
import Textarea from "../../../../componentes/ui/textarea";

const defaultValues: CurriculoFormValues = {
  nome: "",
  cargo: "",
  email: "",
  telefone: "",
  cpf: "",
  resumo: "",
  experiencias: [
    { cargo: "", empresa: "", periodo: "", descricao: "" },
  ],
  formacoes: [{ curso: "", instituicao: "", periodo: "" }],
  habilidades: [""],
};

const createUniqueId = () => String(Date.now());

export default function NovoCurriculoPage() {
  const [curriculos, setCurriculos] = useState<Curriculo[]>([]);
  const [imagemNome, setImagemNome] = useState("Nenhuma imagem selecionada");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CurriculoFormValues>({
    defaultValues,
    resolver: yupResolver(curriculoSchema) as Resolver<CurriculoFormValues>,
  });

  const experiencias = useFieldArray<CurriculoFormValues, "experiencias">({ control, name: "experiencias" });
  const formacoes = useFieldArray<CurriculoFormValues, "formacoes">({ control, name: "formacoes" });
  const habilidades = watch("habilidades") ?? [];

  const addHabilidade = () => setValue("habilidades", [...habilidades, ""]);
  const removeHabilidade = (index: number) => setValue("habilidades", habilidades.filter((_, i) => i !== index));

  useEffect(() => {
    setCurriculos(getCurriculosFromStorage());
  }, []);

  const onSubmit = (values: CurriculoFormValues) => {
    const novo: Curriculo = {
      id: createUniqueId(),
      nome: values.nome,
      cargo: values.cargo,
      email: values.email,
      telefone: values.telefone,
      cpf: values.cpf,
      resumo: values.resumo,
      experiencias: values.experiencias ?? [],
      formacoes: values.formacoes ?? [],
      habilidades: (values.habilidades ?? []).filter(Boolean),
      imagem: "/candidato-1.svg",
    };

    const atualizados = [novo, ...curriculos];
    saveCurriculosToStorage(atualizados);
    setCurriculos(atualizados);
    toast.success("Currículo salvo com sucesso!");
    reset(defaultValues);
    setImagemNome("Nenhuma imagem selecionada");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagemNome(file.name);
      toast.success(`Upload fake de imagem: ${file.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Cadastro de Currículo</p>
              <h1 className="mt-3 text-4xl font-semibold">Formulário dinâmico de talentos</h1>
              <p className="mt-3 text-slate-600">Inclua dados de contato, experiência, formação e habilidades com validação em tempo real.</p>
            </div>
            <div className="rounded-3xl bg-slate-950 px-5 py-4 text-sm text-slate-200 shadow-lg">
              <p className="font-semibold">Upload fake</p>
              <p className="mt-2 text-slate-400">Nome do arquivo:</p>
              <p className="mt-1 text-slate-100">{imagemNome}</p>
            </div>
          </div>
        </div>

        <form className="space-y-8 rounded-3xl bg-white p-8 shadow-sm" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 lg:grid-cols-2">
            <Input label="Nome" error={errors.nome?.message} {...register("nome")} />
            <Input label="Cargo desejado" error={errors.cargo?.message} {...register("cargo")} />
            <Input label="E-mail" error={errors.email?.message} type="email" {...register("email")} />
            <Controller
              control={control}
              name="telefone"
              render={({ field }) => (
                <label className="space-y-2 text-sm text-slate-700">
                  <span className="font-medium">Telefone</span>
                  <InputMask
                    mask="(99) 99999-9999"
                    className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 ${errors.telefone ? "border-rose-500" : "border-slate-300"}`}
                    placeholder="(11) 99999-9999"
                    {...field}
                  />
                  {errors.telefone && <span className="text-xs text-rose-600">{errors.telefone.message}</span>}
                </label>
              )}
            />
            <Controller
              control={control}
              name="cpf"
              render={({ field }) => (
                <label className="space-y-2 text-sm text-slate-700">
                  <span className="font-medium">CPF</span>
                  <InputMask
                    mask="999.999.999-99"
                    className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 ${errors.cpf ? "border-rose-500" : "border-slate-300"}`}
                    placeholder="000.000.000-00"
                    {...field}
                  />
                  {errors.cpf && <span className="text-xs text-rose-600">{errors.cpf.message}</span>}
                </label>
              )}
            />
          </div>

          <Textarea label="Resumo profissional" error={errors.resumo?.message} {...register("resumo")} />

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Experiência profissional</h2>
                <p className="mt-2 text-sm text-slate-600">Adicione quantos cargos quiser.</p>
              </div>
              <Button type="button" variant="secondary" onClick={() => experiencias.append({ cargo: "", empresa: "", periodo: "", descricao: "" })}>
                Adicionar item
              </Button>
            </div>
            <div className="space-y-6">
              {experiencias.fields.map((field, index) => (
                <div key={field.id} className="rounded-3xl bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">Experiência {index + 1}</p>
                    <Button type="button" variant="ghost" className="text-rose-600" onClick={() => experiencias.remove(index)}>
                      Remover
                    </Button>
                  </div>
                  <div className="mt-5 grid gap-6 lg:grid-cols-2">
                    <Input label="Cargo" error={errors.experiencias?.[index]?.cargo?.message as string} {...register(`experiencias.${index}.cargo` as const)} />
                    <Input label="Empresa" error={errors.experiencias?.[index]?.empresa?.message as string} {...register(`experiencias.${index}.empresa` as const)} />
                    <Input label="Período" error={errors.experiencias?.[index]?.periodo?.message as string} {...register(`experiencias.${index}.periodo` as const)} />
                    <Textarea label="Descrição" error={errors.experiencias?.[index]?.descricao?.message as string} {...register(`experiencias.${index}.descricao` as const)} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Formação acadêmica</h2>
                <p className="mt-2 text-sm text-slate-600">Registre cada curso com instituição e período.</p>
              </div>
              <Button type="button" variant="secondary" onClick={() => formacoes.append({ curso: "", instituicao: "", periodo: "" })}>
                Adicionar item
              </Button>
            </div>
            <div className="space-y-6">
              {formacoes.fields.map((field, index) => (
                <div key={field.id} className="rounded-3xl bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">Formação {index + 1}</p>
                    <Button type="button" variant="ghost" className="text-rose-600" onClick={() => formacoes.remove(index)}>
                      Remover
                    </Button>
                  </div>
                  <div className="mt-5 grid gap-6 lg:grid-cols-3">
                    <Input label="Curso" error={errors.formacoes?.[index]?.curso?.message as string} {...register(`formacoes.${index}.curso` as const)} />
                    <Input label="Instituição" error={errors.formacoes?.[index]?.instituicao?.message as string} {...register(`formacoes.${index}.instituicao` as const)} />
                    <Input label="Período" error={errors.formacoes?.[index]?.periodo?.message as string} {...register(`formacoes.${index}.periodo` as const)} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Habilidades</h2>
                <p className="mt-2 text-sm text-slate-600">Cada habilidade pode ser um item separado.</p>
              </div>
              <Button type="button" variant="secondary" onClick={addHabilidade}>Adicionar habilidade</Button>
            </div>
            <div className="space-y-4">
              {habilidades.map((_, index) => (
                <div key={index} className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  <Controller
                    control={control}
                    name={`habilidades.${index}` as const}
                    render={({ field }) => (
                      <Input
                        label={`Habilidade ${index + 1}`}
                        error={errors.habilidades?.[index]?.message as string}
                        {...field}
                      />
                    )}
                  />
                  <Button type="button" variant="ghost" className="text-rose-600" onClick={() => removeHabilidade(index)}>
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <label className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">Upload de imagem (fake)</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-slate-700" />
              </label>
              <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700">Somente demonstração</div>
            </div>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1 text-slate-600 text-sm">
              <p className="font-medium">Dica:</p>
              <p>Use o formulário para gerar perfis mockados e salvar os dados no armazenamento local.</p>
            </div>
            <Button type="submit">Salvar currículo</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
