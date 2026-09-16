import { Evento } from "@/types/evento"

export async function obtenerFavoritos(): Promise<Evento[]> {
  const res = await fetch("/api/favoritos")

  if (!res.ok) {
    throw new Error("No se pudieron obtener los favoritos")
  }

  return res.json()
}

export async function agregarFavorito(eventId: string): Promise<void> {
  const res = await fetch(`/api/favoritos/${eventId}`, {
    method: "POST",
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || "No se pudo agregar a favoritos")
  }
}

export async function eliminarFavorito(eventId: string): Promise<void> {
  const res = await fetch(`/api/favoritos/${eventId}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || "No se pudo eliminar de favoritos")
  }
}
