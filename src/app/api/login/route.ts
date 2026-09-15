import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { usuario, contrasena } = await request.json()

  if (usuario === "admin" && contrasena === "1234") {
    const response = NextResponse.json({ ok: true })
    response.cookies.set("session", "admin", { path: "/" })
    return response
  }

  return NextResponse.json(
    { ok: false, error: "Usuario o contraseña incorrectos" },
    { status: 401 }
  )
}