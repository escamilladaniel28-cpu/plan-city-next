'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [usuario, setUsuario] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ usuario, contrasena }),
    })

    const data = await res.json()

    if (data.ok) {
      router.push("/favoritos")
    } else {
      setError(data.error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 flex flex-col gap-3 max-w-sm mx-auto"
    >
      <h1 className="font-bold text-lg">Login</h1>

      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        className="border rounded p-2"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        className="border rounded p-2"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button type="submit" className="border rounded p-2">
        Entrar
      </button>
    </form>
  )
}