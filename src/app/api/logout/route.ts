import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"

export async function POST() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  if (token) {
    try {
      await fetch(`${BACKEND_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch {
      // Ignorar si el backend falla al cerrar sesión, las cookies se borran de todos modos
    }
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.delete("session")
  response.cookies.delete("role")
  response.cookies.delete("userName")

  return response
}
