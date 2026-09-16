import { Categoria } from "@/types/categoria"

export async function obtenerCategorias(): Promise<Categoria[]> {
  const res = await fetch("/api/categorias")

  if (!res.ok) {
    throw new Error("No se pudieron obtener las categorías")
  }

  return res.json()
}

export async function crearCategoria(datos: {
  name: string
  description?: string
}): Promise<Categoria> {
  const res = await fetch("/api/categorias", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  })

  if (!res.ok) {
    throw new Error("No se pudo crear la categoría")
  }

  return res.json()
}

export async function actualizarCategoria(
  id: string,
  datos: { name?: string; description?: string }
): Promise<Categoria> {
  const res = await fetch(`/api/categorias/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  })

  if (!res.ok) {
    throw new Error("No se pudo actualizar la categoría")
  }

  return res.json()
}

export async function eliminarCategoria(id: string): Promise<void> {
  const res = await fetch(`/api/categorias/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error("No se pudo eliminar la categoría")
  }
}