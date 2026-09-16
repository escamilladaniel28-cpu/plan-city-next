'use client'

import { useCategorias } from "@/hooks/useCategorias"

interface ListaCategoriasProps {
  onSelect?: (id: string) => void
  selectedId?: string
}

export function ListaCategorias({ onSelect, selectedId }: ListaCategoriasProps = {}) {
  const { categorias, cargando } = useCategorias()

  if (cargando) return <p className="text-sm text-gray-500">Cargando categorías...</p>
  if (categorias.length === 0) return <p className="text-sm text-gray-500">No hay categorías todavía.</p>

  return (
    <ul className="flex flex-col gap-2 w-full">
      {categorias.map((categoria) => {
        const isSelected = selectedId === categoria.id
        return (
          <li key={categoria.id} className="w-full">
            <button
              type="button"
              onClick={() => onSelect?.(categoria.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition flex items-center justify-between group ${
                isSelected
                  ? "bg-blue-600 text-white font-semibold shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-400/50"
                  : "bg-slate-900/70 hover:bg-slate-800/90 text-slate-300 hover:text-white border border-slate-800/80 hover:border-slate-700"
              }`}
            >
              <span>{categoria.name}</span>
              <span className={`text-xs ${isSelected ? "text-blue-200" : "text-slate-500 group-hover:text-amber-400"} transition`}>
                →
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}