import { Evento } from "@/types/evento"

export async function obtenerEventos(): Promise<Evento[]> {
  const res = await fetch("http://localhost:3000/api/eventos")

  if (!res.ok) {
    throw new Error("No se pudieron obtener los eventos")
  }

  return res.json()
}