'use client'

import { useCategorias } from "@/hooks/useCategorias"

export function ListaCategorias() {
  const { categorias, cargando } = useCategorias()

  if (cargando) return <p>Cargando categorías...</p>

  return (
    <ul className="flex flex-col gap-3">
      {categorias.map((categoria) => (
        <li key={categoria.id} className="flex flex-col items-center">
          <img
            src={categoria.imagen}
            alt={categoria.nombre}
            className="w-full rounded"
          />
          <span>{categoria.nombre}</span>
        </li>
      ))}
    </ul>
  )
}