"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-full text-sm font-medium transition ${
      pathname?.startsWith(path)
        ? "bg-slate-900 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold text-white">
          Currículos Lab
        </Link>
        <div className="flex flex-wrap gap-2">
          <Link href="/" className={linkClass("/")}>
            Início
          </Link>
          <Link href="/sistema/paginas/curriculos" className={linkClass("/sistema/paginas/curriculos")}>
            Currículos
          </Link>
          <Link href="/sistema/paginas/curriculos/novo" className={linkClass("/sistema/paginas/curriculos/novo")}>
            Novo
          </Link>
        </div>
      </div>
    </nav>
  );
}