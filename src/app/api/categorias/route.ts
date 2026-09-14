import { NextResponse } from "next/server"

export async function GET() {
  const categorias = [
    { id: 1, nombre: "Música" },
    { id: 2, nombre: "Gastronomía" },
    { id: 3, nombre: "Deportes" },
  ]

  return NextResponse.json(categorias)
}