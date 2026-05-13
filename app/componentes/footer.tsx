export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:justify-between sm:items-center">
        <p>© 2026 Laboratório de UX & Currículos. Todos os direitos reservados.</p>
        <div className="flex flex-wrap gap-4">
          <a href="#" className="transition hover:text-slate-900">
            Política de Privacidade
          </a>
          <a href="#" className="transition hover:text-slate-900">
            Suporte
          </a>
        </div>
      </div>
      
    </footer>
  );
}
