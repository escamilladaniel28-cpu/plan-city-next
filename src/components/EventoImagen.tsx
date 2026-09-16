'use client'

import { useState } from "react"
import { getEventoImageUrl } from "@/lib/utils"
import { Evento } from "@/types/evento"

interface EventoImagenProps {
  evento: Evento
  className?: string
  alt?: string
}

export function EventoImagen({ evento, className = "w-full h-40 object-cover", alt }: EventoImagenProps) {
  const [errorCarga, setErrorCarga] = useState(false)
  const imageUrl = getEventoImageUrl(evento)

  if (!imageUrl || errorCarga) {
    return (
      <div className="w-full h-40 bg-slate-950/80 flex flex-col items-center justify-center text-slate-500 text-xs gap-1 border-b border-slate-800">
        <span className="text-xl opacity-60">🖼️</span>
        <span>{errorCarga ? "Imagen no disponible" : "Sin imagen"}</span>
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt={alt || evento.name}
      referrerPolicy="no-referrer"
      onError={() => setErrorCarga(true)}
      className={className}
      loading="lazy"
    />
  )
}
