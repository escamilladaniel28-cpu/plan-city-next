'use client'

import { useState } from "react"
import Link from "next/link"
import { ListaCategorias } from "@/components/ListaCategorias"
import { ListaEventos } from "@/components/ListaEventos"

export default function CategoriasPage() {
  const [selectedCatId, setSelectedCatId] = useState<string | undefined>(undefined)

  function handleSelectCategory(id: string) {
    setSelectedCatId((prev) => (prev === id ? undefined : id))
  }

  return (
    <div className="flex flex-col md:flex-row flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 gap-8">
      <section className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-3xl font-black text-white tracking-tight">Categorías</h1>
          {selectedCatId && (
            <button
              onClick={() => setSelectedCatId(undefined)}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium hover:underline cursor-pointer"
            >
              Mostrar todas
            </button>
          )}
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Selecciona una categoría temática para ver únicamente los eventos que le pertenecen
        </p>
        <ListaCategorias onSelect={handleSelectCategory} selectedId={selectedCatId} />
      </section>

      <aside className="w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-800/80 pt-6 md:pt-0 md:pl-6 shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-sm text-white flex items-center gap-1.5">
            <span className="text-amber-400">📅</span>
            {selectedCatId ? "Eventos de la Categoría" : "Todos los Eventos"}
          </h2>
          <Link
            href={selectedCatId ? `/eventos?categoryId=${selectedCatId}` : "/eventos"}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium transition hover:underline"
          >
            Ver en pantalla completa →
          </Link>
        </div>
        <ListaEventos categoryId={selectedCatId} />
      </aside>
    </div>
  )
}