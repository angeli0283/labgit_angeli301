import Link from "next/link";
import { HiBriefcase, HiUsers } from "react-icons/hi";

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Sistema de Currículos</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Busque, cadastre e gerencie talentos com fluidez.
          </h1>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href="/sistema/paginas/curriculos"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-slate-200 transition hover:border-[#7c3aed] hover:bg-[#111827]"
          >
            <HiUsers className="h-4 w-4" /> Lista de Currículos
          </Link>
          <Link
            href="/sistema/paginas/curriculos/novo"
            className="inline-flex items-center gap-2 rounded-full bg-[#6366f1] px-4 py-2 text-white transition hover:bg-[#4f46e5]"
          >
            <HiBriefcase className="h-4 w-4" /> Novo Currículo
          </Link>
        </div>
      </div>
    </header>
  );
}
