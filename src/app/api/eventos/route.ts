import { NextResponse } from "next/server"

export async function GET() {
  const eventos = [
    { id: 1, nombre: "Concierto en el parque", imagen: "https://picsum.photos/seed/concierto/300/200" },
    { id: 2, nombre: "Feria gastronómica", imagen: "https://picsum.photos/seed/feria/300/200" },
    { id: 3, nombre: "Noche de cine al aire libre", imagen: "https://picsum.photos/seed/cine-aire/300/200" },
    { id: 4, nombre: "Torneo de fútbol barrial", imagen: "https://picsum.photos/seed/futbol/300/200" },
    { id: 5, nombre: "Feria de emprendedores", imagen: "https://picsum.photos/seed/emprendedores/300/200" },
  ]

  return NextResponse.json(eventos)
}