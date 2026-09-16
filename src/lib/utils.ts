import { Evento } from "@/types/evento"

export function getEventoImageUrl(evento: Partial<Evento> & { imagen?: string; image?: string }): string | null {
  if (!evento) return null

  // 1. Arreglo de images (EventImage[] o string[])
  if (Array.isArray(evento.images) && evento.images.length > 0) {
    const first: any = evento.images[0]
    if (typeof first === "string" && first.trim()) return first.trim()
    if (first && typeof first.url === "string" && first.url.trim()) return first.url.trim()
  }

  // 2. Propiedad imagen o image directa (compatibilidad)
  if (typeof evento.imagen === "string" && evento.imagen.trim()) return evento.imagen.trim()
  if (typeof evento.image === "string" && evento.image.trim()) return evento.image.trim()

  return null
}
