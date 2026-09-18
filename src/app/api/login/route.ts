import { NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    return NextResponse.json(
      { ok: false, error: "Correo o contraseña incorrectos" },
      { status: 401 }
    )
  }

  const data = await res.json()

  const response = NextResponse.json({ ok: true })
  response.cookies.set("session", data.accessToken, { path: "/" })
  response.cookies.set("role", data.user.role, { path: "/" })
  if (data.user?.name) {
    response.cookies.set("userName", encodeURIComponent(data.user.name), { path: "/" })
  }

  return response
}