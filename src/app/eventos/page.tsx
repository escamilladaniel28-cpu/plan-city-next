'use client'

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ListaCategorias } from "@/components/ListaCategorias"
import { ListaEventos } from "@/components/ListaEventos"

function EventosContent() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""
  const initialCat = searchParams.get("categoria") || searchParams.get("categoryId") || undefined

  const [search, setSearch] = useState(initialSearch)
  const [categoryId, setCategoryId] = useState<string | undefined>(initialCat)

  useEffect(() => {
    const querySearch = searchParams.get("search")
    if (querySearch !== null) setSearch(querySearch)
    const queryCat = searchParams.get("categoria") || searchParams.get("categoryId")
    if (queryCat !== null) setCategoryId(queryCat)
  }, [searchParams])

  function handleSelectCategory(id: string) {
    setCategoryId((prev) => (prev === id ? undefined : id))
  }

  function handleClearFilters() {
    setSearch("")
    setCategoryId(undefined)
  }

  const hasActiveFilters = !!search || !!categoryId

  return (
    <div className="flex flex-col md:flex-row flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 gap-8">
      <section className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Eventos</h1>
            <p className="text-xs text-slate-400 mt-1">Explora actividades y experiencias en tu ciudad</p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-2 text-sm w-full sm:w-72 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition shadow-inner"
            />
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs text-red-400 border border-red-800/60 bg-red-950/40 px-3 py-2 rounded-xl hover:bg-red-900/60 shrink-0 transition font-medium cursor-pointer"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        <ListaEventos search={search} categoryId={categoryId} />
      </section>

      <aside className="w-full md:w-64 border-t md:border-t-0 md:border-l border-slate-800/80 pt-6 md:pt-0 md:pl-6 shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-sm text-white flex items-center gap-1.5">
            <span className="text-amber-400">🏷️</span> Categorías
          </h2>
          {categoryId && (
            <button
              type="button"
              onClick={() => setCategoryId(undefined)}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium hover:underline cursor-pointer"
            >
              Ver todas
            </button>
          )}
        </div>
        <ListaCategorias onSelect={handleSelectCategory} selectedId={categoryId} />
      </aside>
    </div>
  )
}

export default function EventosPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 text-sm">Cargando eventos...</div>}>
      <EventosContent />
    </Suspense>
  )
}