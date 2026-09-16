import { Usuario } from "@/types/usuario"

export async function obtenerUsuarios(): Promise<Usuario[]> {
  const res = await fetch("/api/usuarios")

  if (!res.ok) {
    throw new Error("No se pudieron obtener los usuarios")
  }

  return res.json()
}
