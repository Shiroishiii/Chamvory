
import { Link } from 'react-router-dom'
import { ArrowLeft, Headset, Home } from 'lucide-react'

function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6 py-12">
            <div className="w-full max-w-md text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-primary">
                    <Headset size={27} />
                </div>

                <p className="mt-8 text-sm font-semibold tracking-widest text-primary">
                    ERRO 404
                </p>

                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    Página não encontrada
                </h1>

                <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-gray-500">
                    A página que você está procurando não existe, foi removida ou o endereço informado está incorreto.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
                    >
                        <Home size={16} />
                        Voltar ao início
                    </Link>

                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                    >
                        <ArrowLeft size={16} />
                        Voltar à página anterior
                    </button>
                </div>

                <p className="mt-12 text-xs text-gray-400">
                    Chamvory · Sistema de gerenciamento de chamados
                </p>
            </div>
        </main>
    )
}

export default NotFound
