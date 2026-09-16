import { Evento } from "@/types/evento"

export interface FiltrosEvento {
  search?: string
  categoryId?: string
}

export async function obtenerEventos(filtros?: FiltrosEvento): Promise<Evento[]> {
  const params = new URLSearchParams()
  if (filtros?.search) params.set("search", filtros.search)
  if (filtros?.categoryId) params.set("categoryId", filtros.categoryId)

  const queryString = params.toString()
  const url = queryString ? `/api/eventos?${queryString}` : "/api/eventos"

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("No se pudieron obtener los eventos")
  }

  return res.json()
}

export async function crearEvento(datos: {
  name: string
  description?: string
  date: string
  location: string
  price: number
  capacity: number
  categoryId: string
  images?: string[]
}): Promise<Evento> {
  const res = await fetch("/api/eventos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || "No se pudo crear el evento")
  }

  return res.json()
}

export async function actualizarEvento(
  id: string,
  datos: Partial<{
    name: string
    description?: string
    date: string
    location: string
    price: number
    capacity: number
    categoryId: string
    images?: string[]
  }>
): Promise<Evento> {
  const res = await fetch(`/api/eventos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || "No se pudo actualizar el evento")
  }

  return res.json()
}

export async function eliminarEvento(id: string): Promise<void> {
  const res = await fetch(`/api/eventos/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error("No se pudo eliminar el evento")
  }
}