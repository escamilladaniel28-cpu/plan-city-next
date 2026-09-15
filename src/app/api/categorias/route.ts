import { NextResponse } from "next/server"

export async function GET() {
  const categorias = [
    { id: 1, nombre: "Música", imagen: "https://picsum.photos/seed/musica/300/200" },
    { id: 2, nombre: "Gastronomía", imagen: "https://picsum.photos/seed/gastronomia/300/200" },
    { id: 3, nombre: "Deportes", imagen: "https://picsum.photos/seed/deportes/300/200" },
    { id: 4, nombre: "Cine", imagen: "https://picsum.photos/seed/cine/300/200" },
    { id: 5, nombre: "Negocios", imagen: "https://picsum.photos/seed/negocios/300/200" },
  ]

  return NextResponse.json(categorias)
}