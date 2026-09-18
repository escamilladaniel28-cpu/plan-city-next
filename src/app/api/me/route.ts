import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  if (!token) {
    return NextResponse.json({ ok: false, error: "No autenticado" }, { status: 401 })
  }

  try {
    const res = await fetch(`${BACKEND_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Error al obtener perfil" },
        { status: res.status }
      )
    }

    const user = await res.json()
    const response = NextResponse.json({ ok: true, user })
    if (user?.name) {
      response.cookies.set("userName", encodeURIComponent(user.name), { path: "/" })
    }
    return response
  } catch {
    return NextResponse.json(
      { ok: false, error: "Error al conectar con el servidor" },
      { status: 500 }
    )
  }
}
