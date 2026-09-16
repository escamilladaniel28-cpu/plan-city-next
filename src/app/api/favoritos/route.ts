import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const res = await fetch(`${BACKEND_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    return NextResponse.json(
      { error: "No se pudieron obtener los favoritos" },
      { status: res.status }
    )
  }

  const data = await res.json()
  return NextResponse.json(data)
}
