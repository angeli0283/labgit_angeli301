"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { HiSearch, HiSparkles } from "react-icons/hi";


import {
  Curriculo,
  getCurriculosFromStorage,
} from "@/lib/curriculos";


import Button from "@/app/componentes/ui/button";

export default function CurriculosPage() {
  const [curriculos, setCurriculos] = useState<Curriculo[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const data: Curriculo[] =
      getCurriculosFromStorage() || [];
  setCurriculos(data);
  }, []);

  const filteredCurriculos = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    if (!lowerQuery) return curriculos;

    return curriculos.filter((curriculo) => {
      return (
        curriculo.nome
          ?.toLowerCase()
          .includes(lowerQuery) ||
        curriculo.cargo
          ?.toLowerCase()
          .includes(lowerQuery)
      );
    });
  }, [curriculos, query]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* HERO */}
        <div className="mb-10 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 p-8 text-white shadow-2xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-300">
                Lista de Currículos
              </p>

              <h2 className="mt-4 text-4xl font-semibold">
                Encontre os profissionais certos para sua vaga
              </h2>

              <p className="mt-3 max-w-2xl text-slate-200">
                Filtre por nome ou cargo em tempo real e explore perfis
                com resumo profissional, competências e histórico de
                trabalho.
              </p>
            </div>

            <Link href="/sistema/paginas/curriculos/novo">
              <Button variant="primary">
                Adicionar novo currículo
              </Button>
            </Link>
          </div>
        </div>

        {/* BUSCA */}
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <label className="relative block">
            <HiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Buscar por nome ou cargo"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-12 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </label>
        </div>

        {/* LISTA */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredCurriculos.length > 0 ? (
            filteredCurriculos.map((curriculo) => (
              <article
                key={curriculo.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex items-center gap-4 border-b border-slate-100 p-5">
                  <Image
                    src={
                      curriculo.imagem ||
                      "/default-user.png"
                    }
                    alt={`Foto de ${curriculo.nome}`}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-3xl border border-slate-200 object-cover"
                  />

                  <div>
                    <p className="text-sm text-slate-500">
                      {curriculo.cargo}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold text-slate-900">
                      {curriculo.nome}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  <p className="text-sm leading-7 text-slate-600">
                    {curriculo.resumo}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {(curriculo.habilidades || [])
                      .slice(0, 4)
                      .map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>

                  <Link
                    href={`/sistema/paginas/curriculos/${curriculo.id}`}
                  >
                    <Button variant="secondary">
                      Ver detalhes
                    </Button>
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-600 shadow-sm">
              <p className="text-xl font-semibold">
                Nenhum currículo encontrado
              </p>

              <p className="mt-3">
                Tente outro nome ou cargo, ou cadastre um novo perfil.
              </p>
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="mt-10 rounded-3xl bg-slate-950 p-8 text-white shadow-2xl">
          <div className="flex items-center gap-3 text-slate-200">
            <HiSparkles className="h-6 w-6 text-cyan-300" />

            <p className="text-sm sm:text-base">
              O sistema usa dados mockados e armazenamento local para
              manter o conteúdo entre atualizações de página.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}