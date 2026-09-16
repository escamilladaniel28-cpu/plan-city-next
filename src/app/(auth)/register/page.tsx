'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { EventureLogo } from "@/components/EventureLogo"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (name.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    if (confirmPassword && password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setCargando(true)
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (data.ok) {
        router.push("/favoritos")
        router.refresh()
      } else {
        setError(data.error || "No se pudo completar el registro")
      }
    } catch {
      setError("Ocurrió un error de red al intentar registrarse")
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#0C101B]/90 border border-amber-500/20 rounded-2xl p-7 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.06)] backdrop-blur-xl">
        {/* Logo superior centrado */}
        <div className="flex justify-center mb-5">
          <EventureLogo iconSize={32} />
        </div>

        <h1 className="text-xl font-bold text-center text-white mb-6">
          Register en Eventure
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Campo Nombre Completo */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Nombre Completo</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 text-sm">👤</span>
              <input
                type="text"
                placeholder="Ej: Carlos Mendoza"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#080B12] border border-slate-700/80 focus:border-blue-500 text-white placeholder-slate-500 rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-hidden focus:ring-1 focus:ring-blue-500 transition shadow-inner"
              />
            </div>
          </div>

          {/* Campo Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Email</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 text-sm">✉️</span>
              <input
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#080B12] border border-slate-700/80 focus:border-blue-500 text-white placeholder-slate-500 rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-hidden focus:ring-1 focus:ring-blue-500 transition shadow-inner"
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Contraseña</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 text-sm">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-[#080B12] border border-slate-700/80 focus:border-blue-500 text-white placeholder-slate-500 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-hidden focus:ring-1 focus:ring-blue-500 transition shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-200 text-sm"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Campo Confirmar Contraseña */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Confirmar Contraseña</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 text-sm">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-[#080B12] border border-slate-700/80 focus:border-blue-500 text-white placeholder-slate-500 rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:outline-hidden focus:ring-1 focus:ring-blue-500 transition shadow-inner"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-950/50 border border-red-800/60 rounded-xl text-red-300 text-xs">
              {error}
            </div>
          )}

          {/* Botón Primario Dorado */}
          <button
            type="submit"
            disabled={cargando}
            className="w-full mt-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black rounded-xl py-3 text-sm shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:brightness-110 active:scale-98 transition disabled:opacity-50 cursor-pointer"
          >
            {cargando ? "Creando cuenta..." : "Crear Cuenta"}
          </button>

          {/* Enlace a Login */}
          <div className="text-center mt-3 pt-4 border-t border-slate-800/80 text-xs">
            <span className="text-slate-400">¿Ya tengo cuenta? </span>
            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 font-semibold transition hover:underline"
            >
              Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}