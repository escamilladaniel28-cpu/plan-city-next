'use client'

import { useEventos } from "@/hooks/useEventos"

export function ListaEventos() {
  const { eventos, cargando } = useEventos()

  if (cargando) return <p>Cargando eventos...</p>

  return (
    <ul className="flex flex-col gap-3">
      {eventos.map((evento) => (
        <li key={evento.id} className="flex flex-col items-center">
          <img
            src={evento.imagen}
            alt={evento.nombre}
            className="w-full rounded"
          />
          <span>{evento.nombre}</span>
        </li>
      ))}
    </ul>
  )
}