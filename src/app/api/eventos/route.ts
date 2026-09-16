import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const queryString = searchParams.toString()
  const targetUrl = queryString ? `${BACKEND_URL}/events?${queryString}` : `${BACKEND_URL}/events`

  const res = await fetch(targetUrl, {
    cache: "no-store",
  })

  if (!res.ok) {
    return NextResponse.json(
      { error: "No se pudieron obtener los eventos" },
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

  const res = await fetch(`${BACKEND_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    return NextResponse.json(
      { error: "No se pudo crear el evento" },
      { status: res.status }
    )
  }

  const data = await res.json()
  return NextResponse.json(data)
}