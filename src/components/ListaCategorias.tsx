'use client'

import { useCategorias } from "@/hooks/useCategorias"

export function ListaCategorias() {
  const { categorias, cargando } = useCategorias()

  if (cargando) return <p>Cargando categorías...</p>

  return (
    <ul>
      {categorias.map((categoria) => (
        <li key={categoria.id}>{categoria.nombre}</li>
      ))}
    </ul>
  )
}