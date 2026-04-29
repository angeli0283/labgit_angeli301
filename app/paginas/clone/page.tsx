export default function Clone() {
  return (
    <main className="min-h-screen bg-white text-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-10">

        <h1 className="text-3xl font-bold text-center">
          Tutorial Git - Passo a Passo
        </h1>

        {/* 1 - Clonar */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1 - Clonar o repositório</h2>

          <div className="bg-black text-white p-4 rounded-lg">
            <code>git clone {"url do repositorio"} {"nome do projeto"}</code>
          </div>

          <h3 className="font-medium">1.1 - Entrar na pasta do projeto</h3>
          <div className="bg-black text-white p-4 rounded-lg">
            <code>cd /nome-do-projeto</code>
          </div>

          <h3 className="font-medium">1.2 - Instalar o projeto</h3>
          <div className="bg-black text-white p-4 rounded-lg">
            <code>npm install</code>
          </div>
        </section>

        {/* 2 - Configurar repositório */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            2 - Enviar os dados para o repositório
          </h2>

          <h3>2.1 - Criar o repositório no GitHub</h3>

          <h3>2.2 - Iniciar o git no projeto</h3>
          <div className="bg-black text-white p-4 rounded-lg">
            <code>git init</code>
          </div>

          <h3>2.3 - Verificar o repositório remoto</h3>
          <div className="bg-black text-white p-4 rounded-lg">
            <code>git remote -v</code>
          </div>

          <h3>2.4 - Remover o repositório remoto (se necessário)</h3>
          <div className="bg-black text-white p-4 rounded-lg">
            <code>git remote remove origin</code>
          </div>

          <h3>2.5 - Adicionar o repositório</h3>
          <div className="bg-black text-white p-4 rounded-lg">
            <code>git remote add origin {"url do repositorio"}</code>
          </div>

          <h3>2.6 - Forçar a branch main</h3>
          <div className="bg-black text-white p-4 rounded-lg">
            <code>git branch -M main</code>
          </div>
        </section>

        {/* 3 - Enviar arquivos */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            3 - Enviar os arquivos para o Git
          </h2>

          <h3>3.1 - Empacotar os arquivos</h3>
          <div className="bg-black text-white p-4 rounded-lg">
            <code>git add .</code>
          </div>

          <h3>3.2 - Criar commit</h3>
          <div className="bg-black text-white p-4 rounded-lg">
            <code>git commit -m {"versao 1"}</code>
          </div>

          <h3>3.3 - Enviar para o repositório</h3>
          <div className="bg-black text-white p-4 rounded-lg">
            <code>git push -u origin main</code>
          </div>
        </section>

        {/* Botão final */}
        <div className="text-center pt-6">
          <button className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition">
            Finalizar Tutorial
          </button>
        </div>

      </div>
    </main>
  );
}