import { Categoria } from "@/types/categoria"

export async function obtenerCategorias(): Promise<Categoria[]> {
  const res = await fetch("http://localhost:3000/api/categorias")

  if (!res.ok) {
    throw new Error("No se pudieron obtener las categorías")
  }

  return res.json()
}