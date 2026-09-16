import { NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"

export async function POST(request: Request) {
  const { name, email, password } = await request.json()

  const res = await fetch(`${BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  })

  const data = await res.json()

  if (!res.ok) {
    const errorMsg = Array.isArray(data.message)
      ? data.message.join(", ")
      : data.message || "Error al registrar el usuario"

    return NextResponse.json(
      { ok: false, error: errorMsg },
      { status: res.status }
    )
  }

  const response = NextResponse.json({ ok: true, user: data.user })
  response.cookies.set("session", data.accessToken, { path: "/" })
  response.cookies.set("role", data.user.role, { path: "/" })

  return response
}
