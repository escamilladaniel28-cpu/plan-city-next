'use client'

import { useRouter } from "next/navigation"
import { ListaCategorias } from "@/components/ListaCategorias"
import { ListaEventos } from "@/components/ListaEventos"

export default function CategoriasPage() {
  const router = useRouter()

  function handleSelectCategory() {
    router.push("/eventos")
  }

  return (
    <div className="flex flex-col md:flex-row flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 gap-8">
      <section className="flex-1">
        <h1 className="text-3xl font-black text-white tracking-tight mb-1">Categorías</h1>
        <p className="text-xs text-slate-400 mb-6">Explora eventos agrupados por categoría temática</p>
        <ListaCategorias onSelect={handleSelectCategory} />
      </section>

      <aside className="w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-800/80 pt-6 md:pt-0 md:pl-6 shrink-0">
        <h2 className="font-bold text-sm text-white mb-4 flex items-center gap-1.5">
          <span className="text-amber-400">📅</span> Próximos Eventos
        </h2>
        <ListaEventos />
      </aside>
    </div>
  )
}