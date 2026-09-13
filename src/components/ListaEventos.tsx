'use client'

import { useEventos } from "@/hooks/useEventos"

export function ListaEventos() {
  const { eventos, cargando } = useEventos()

  if (cargando) return <p>Cargando eventos...</p>

  return (
    <ul>
      {eventos.map((evento) => (
        <li key={evento.id}>{evento.nombre}</li>
      ))}
    </ul>
  )
}