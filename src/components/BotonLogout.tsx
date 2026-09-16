'use client'

import { useRouter } from "next/navigation"

export function BotonLogout() {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      type="button"
      className="text-xs font-medium text-slate-400 hover:text-red-400 bg-slate-900/80 hover:bg-red-950/40 border border-slate-800 hover:border-red-800/60 px-3 py-1.5 rounded-md transition shrink-0"
    >
      Cerrar sesión
    </button>
  )
}
