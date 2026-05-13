export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-24 sm:px-10">
        <div className="rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-950 via-[#3b076d] to-[#0f172a] p-10 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.65)]">
          <div className="space-y-6 text-center sm:text-left">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Bem-vindo ao sistema de currículos</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl md:text-6xl">
              Crie, veja e organize perfis com uma navegação prática e acolhedora.
            </h1>
            <p className="mx-auto max-w-3xl text-base leading-8 text-slate-300 sm:mx-0 sm:text-lg">
              Registre experiências reais, veja o histórico de cada candidato e mantenha tudo alinhado em um layout escuro com toques de roxo e azul.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-5 sm:text-left">
            <a
              href="/sistema/paginas/curriculos"
              className="inline-flex items-center justify-center rounded-full bg-[#6366f1] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4f46e5]"
            >
              Ver currículos
            </a>
            <a
              href="/sistema/paginas/curriculos/novo"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-[#7c3aed] hover:bg-[#111827]"
            >
              Cadastrar novo perfil
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-slate-800 bg-slate-900 p-8 shadow-xl">
            <h2 className="text-xl font-semibold text-white">Fluxo tranquilo</h2>
            <p className="mt-4 text-slate-400">Uma interface que privilegia clareza e foco para quem está montando ou avaliando um currículo.</p>
          </div>
          <div className="rounded-[1.5rem] border border-slate-800 bg-slate-900 p-8 shadow-xl">
            <h2 className="text-xl font-semibold text-white">Dados visíveis</h2>
            <p className="mt-4 text-slate-400">Campos com validação ajudam a garantir que as informações fiquem completas e prontas para a próxima etapa.</p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-[1.5rem] bg-[#312e81] p-6 text-slate-100 shadow-lg">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Organização</p>
            <p className="mt-4 text-lg font-semibold">Registros limpos e fáceis de navegar</p>
          </div>
          <div className="rounded-[1.5rem] bg-[#1e293b] p-6 text-slate-100 shadow-lg">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Validação</p>
            <p className="mt-4 text-lg font-semibold">Campos claros e consistentes</p>
          </div>
          <div className="rounded-[1.5rem] bg-[#4c1d95] p-6 text-slate-100 shadow-lg">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Busca</p>
            <p className="mt-4 text-lg font-semibold">Encontre candidatos pela função ou nome</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-sm text-slate-500">
        Criado como uma interface humana para gerenciar perfis profissionais com estilo e simplicidade.
      </footer>
    </div>
  );
  
}
