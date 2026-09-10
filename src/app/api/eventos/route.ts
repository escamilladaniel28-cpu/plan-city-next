import { NextResponse } from "next/server"

export async function GET() {
  const eventos = [
    { id: 1, nombre: "Concierto en el parque" },
    { id: 2, nombre: "Feria gastronómica" },
  ]

  return NextResponse.json(eventos)
}