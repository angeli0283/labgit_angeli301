"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { HiArrowLeft, HiMail, HiPhone, HiClipboardList } from "react-icons/hi";
import { Curriculo, findCurriculoById } from "../../../../../lib/curriculos";
import Button from "../../../../componentes/ui/button";

export default function CurriculoDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const [curriculo, setCurriculo] = useState<Curriculo | null>(null);

  useEffect(() => {
    if (!params?.id) return;
    const encontrado = findCurriculoById(params.id as string);
    setCurriculo(encontrado ?? null);
  }, [params]);

  if (!curriculo) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-20 text-center text-slate-700">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-16 shadow-lg">
          <p className="text-2xl font-semibold">Currículo não encontrado</p>
          <p className="mt-3">Verifique a URL ou retorne à lista de currículos.</p>
          <Button className="mt-8" variant="secondary" onClick={() => router.push("/sistema/paginas/curriculos")}>Voltar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Detalhes do candidato</p>
            <h1 className="mt-3 text-4xl font-semibold">{curriculo.nome}</h1>
            <p className="mt-2 text-slate-600">{curriculo.cargo}</p>
          </div>
          <Button variant="secondary" onClick={() => router.push("/sistema/paginas/curriculos")}>
            <HiArrowLeft className="mr-2 h-5 w-5" /> Voltar
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <Image src={curriculo.imagem} alt={curriculo.nome} width={100} height={100} className="rounded-3xl" />
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Perfil</p>
                <p className="mt-3 text-xl font-semibold text-slate-900">{curriculo.nome}</p>
              </div>
            </div>
            <div className="mt-8 space-y-4 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <HiMail className="h-5 w-5 text-slate-400" /> <span>{curriculo.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <HiPhone className="h-5 w-5 text-slate-400" /> <span>{curriculo.telefone}</span>
              </div>
              <div className="flex items-center gap-3">
                <HiClipboardList className="h-5 w-5 text-slate-400" /> <span>{curriculo.cpf}</span>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Resumo profissional</h2>
              <p className="mt-4 leading-7 text-slate-600">{curriculo.resumo}</p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-900">Experiências</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-500">{curriculo.experiencias.length} itens</span>
              </div>
              <div className="mt-5 space-y-5">
                {curriculo.experiencias.map((item, index) => (
                  <div key={`${item.cargo}-${index}`} className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-900">{item.cargo} · {item.empresa}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.periodo}</p>
                    <p className="mt-3 text-slate-600">{item.descricao}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Formação acadêmica</h2>
              <div className="mt-5 space-y-4">
                {curriculo.formacoes.map((item, index) => (
                  <div key={`${item.curso}-${index}`} className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm font-semibold text-slate-900">{item.curso}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.instituicao}</p>
                    <p className="mt-2 text-slate-600">{item.periodo}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Habilidades</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {curriculo.habilidades.map((habilidade) => (
                  <span key={habilidade} className="rounded-full bg-cyan-50 px-4 py-2 text-sm text-cyan-700">
                    {habilidade}
                  </span>
                ))}
              </div>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}
