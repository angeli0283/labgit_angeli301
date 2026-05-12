"use client"

import { useState } from "react"
import { Check, Copy, Terminal, GitBranch, Link2, Trash2, AlertCircle } from "lucide-react"

interface Step {
  number: number
  title: string
  description: string
  command?: string
  note?: string
  icon: React.ReactNode
}

const steps: Step[] = [
  {
    number: 1,
    title: "Criar um repositório remoto",
    description:
      "Abra a sua plataforma de código preferida e crie um novo repositório para o projeto.",
    icon: <GitBranch className="h-5 w-5" />,
  },
  {
    number: 2,
    title: "Inicializar o Git no projeto",
    description: "Na pasta do projeto do Visual Studio, abra o terminal e digite o comando abaixo:",
    command: "git init",
    note: "Inicializa o Git dentro da pasta do projeto",
    icon: <Terminal className="h-5 w-5" />,
  },
  {
    number: 3,
    title: "Verificar repositório conectado",
    description: "Para verificar se há algum repositório remoto conectado ao projeto:",
    command: "git remote -v",
    icon: <AlertCircle className="h-5 w-5" />,
  },
  {
    number: 4,
    title: "Conectar ao repositório remoto",
    description: "Vincule seu projeto local ao repositório remoto com o comando abaixo:",
    command: 'git remote add origin "https://seu-repositorio.git"',
    note: "Substitua o endereço pelo URL real do seu repositório remoto",
    icon: <Link2 className="h-5 w-5" />,
  },
  {
    number: 5,
    title: "Remover repositório (se necessário)",
    description: "Caso precise remover um repositório conectado para adicionar outro:",
    command: "git remote remove origin",
    note: "Após remover, conecte no novo repositório usando o comando do passo 4",
    icon: <Trash2 className="h-5 w-5" />,
  },
]

function CommandBlock({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-3 flex items-center gap-2 rounded-lg bg-slate-100 p-3 font-mono text-sm border border-slate-200">
      <code className="flex-1 text-blue-700">{command}</code>
      <button
        onClick={copyToClipboard}
        className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
        aria-label="Copiar comando"
      >
        {copied ? <Check className="h-4 w-4 text-blue-600" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )
}

function StepCard({ step }: { step: Step }) {
  return (
    <div className="group relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
          {step.icon}
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="rounded-full bg-blue-800 px-2.5 py-0.5 text-xs font-semibold text-white">
              Passo {step.number}
            </span>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-slate-900">{step.title}</h3>
          <p className="text-slate-600">{step.description}</p>

          {step.command && <CommandBlock command={step.command} />}

          {step.note && (
            <p className="mt-3 flex items-start gap-2 text-sm text-slate-500">
              <span className="mt-0.5 text-blue-600">*</span>
              {step.note}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function GitGuidePage() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100">
      <div className="mx-auto max-w-3xl">        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2">
            <GitBranch className="h-5 w-5 text-indigo-400" />
            <span className="text-sm font-medium text-slate-200">Guia Git</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Conecte seu projeto ao repositório remoto com confiança
          </h1>
          <p className="text-slate-400">
            Siga este guia passo a passo para configurar o controle de versão do seu projeto.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>

        {/* Footer tip */}
        <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h4 className="mb-2 flex items-center gap-2 font-semibold text-blue-800">
            <Terminal className="h-5 w-5" />
            Dica extra
          </h4>
          <p className="text-sm text-slate-600">
            Após conectar o repositório, não esqueça de fazer o primeiro commit e push:
          </p>
          <div className="mt-3 space-y-2">
            <CommandBlock command="git add ." />
            <CommandBlock command='git commit -m "Primeiro commit"' />
            <CommandBlock command="git push -u origin main" />
          </div>
        </div>
      </div>
    </div>
  )
}
