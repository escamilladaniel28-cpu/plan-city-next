import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"

export async function GET() {
  const res = await fetch(`${BACKEND_URL}/categories`, {
    cache: "no-store",
  })

  if (!res.ok) {
    return NextResponse.json(
      { error: "No se pudieron obtener las categorías" },
      { status: res.status }
    )
  }

  const data = await res.json()
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value
  const body = await request.json()

  const res = await fetch(`${BACKEND_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    return NextResponse.json(
      { error: "No se pudo crear la categoría" },
      { status: res.status }
    )
  }

  const data = await res.json()
  return NextResponse.json(data)
}