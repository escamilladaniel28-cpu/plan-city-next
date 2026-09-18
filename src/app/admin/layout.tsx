'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { EventureLogo } from "@/components/EventureLogo"

interface UserProfile {
  id?: string
  name: string
  email?: string
  role?: string
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    // 1. Leer inmediatamente de cookie userName si existe
    if (typeof document !== "undefined") {
      const match = document.cookie.match(new RegExp("(^| )userName=([^;]+)"))
      if (match) {
        try {
          const decoded = decodeURIComponent(match[2])
          if (decoded) setUser({ name: decoded })
        } catch {}
      }
    }

    // 2. Consultar perfil en /api/me
    fetch("/api/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.ok && data?.user) {
          setUser(data.user)
        }
      })
      .catch(() => {})
  }, [])

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }

  const navItems = [
    { label: "Resumen", href: "/admin", icon: "📊", exact: true },
    { label: "Events Panel", href: "/admin/eventos", icon: "📅" },
    { label: "Categories Panel", href: "/admin/categorias", icon: "🏷️" },
    { label: "Users Panel", href: "/admin/usuarios", icon: "👥" },
  ]

  const isCurrentActive = (itemHref: string, exact?: boolean) => {
    if (exact) return pathname === itemHref
    return pathname.startsWith(itemHref)
  }

  const initial = user?.name ? user.name.trim().charAt(0).toUpperCase() : "A"
  const displayName = user?.name || "Administrador"

  return (
    <div className="min-h-screen text-slate-100 flex flex-col">
      {/* TOP BAR del Dashboard */}
      <header className="border-b border-zinc-800/80 bg-[#050507]/90 backdrop-blur-md sticky top-0 z-50 h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Botón menú móvil */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-slate-400 hover:text-white p-1 text-lg"
          >
            ☰
          </button>
          <EventureLogo iconSize={26} />
        </div>

        {/* Buscador Central Alargado */}
        <div className="hidden sm:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Buscar eventos, categorías o usuarios..."
              className="w-full bg-[#08080b] border border-zinc-700/80 focus:border-blue-500 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500 transition shadow-inner"
            />
          </div>
        </div>

        {/* Perfil de Usuario & Accesos */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-amber-400 px-3 py-1.5 rounded-full border border-zinc-800 hover:border-amber-500/30 transition hidden lg:inline-block"
          >
            ← Volver a la Web
          </Link>

          {/* Menú de Usuario Logueado */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              type="button"
              className="flex items-center gap-2 bg-[#0e0e12] hover:bg-[#15151a] border border-zinc-700/80 hover:border-amber-500/40 px-3 py-1.5 rounded-full text-xs text-slate-200 shadow-xs transition cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold flex items-center justify-center text-[10px] shadow-xs">
                {initial}
              </div>
              <span className="font-semibold text-white hidden sm:inline max-w-[140px] truncate">
                {displayName}
              </span>
              <span className="text-[10px] text-slate-400">▾</span>
            </button>

            {/* Dropdown flotante */}
            {userMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-[#0c0c10] border border-zinc-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-zinc-800/80">
                    <p className="text-xs font-semibold text-white truncate">
                      {displayName}
                    </p>
                    {user?.email && (
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {user.email}
                      </p>
                    )}
                    <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                      {user?.role || "Admin"}
                    </span>
                  </div>

                  <div className="p-1">
                    <Link
                      href="/"
                      onClick={() => setUserMenuOpen(false)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-zinc-800/60 rounded-lg transition"
                    >
                      <span>🌐</span>
                      <span>Sitio Público</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      type="button"
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition cursor-pointer mt-1"
                    >
                      <span>🚪</span>
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* SIDEBAR LATERAL (como en Screens 4, 5, 6) */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-40 w-60 bg-[#050507] border-r border-zinc-800/80 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } flex flex-col justify-between pt-20 md:pt-4 pb-6 px-3 shrink-0`}
        >
          <div className="flex flex-col gap-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
              Navegación Admin
            </p>

            {navItems.map((item) => {
              const active = isCurrentActive(item.href, item.exact)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    active
                      ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.45)]"
                      : "text-slate-300 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}

            <div className="my-3 border-t border-zinc-800/80"></div>

            <div className="flex items-center gap-3 px-3.5 py-2 text-xs text-slate-500">
              <span className="text-base">📈</span>
              <span>Analíticas (Pronto)</span>
            </div>

            <div className="flex items-center gap-3 px-3.5 py-2 text-xs text-slate-500">
              <span className="text-base">⚙️</span>
              <span>Ajustes</span>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800/80 px-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-amber-400 transition"
            >
              <span>🌐</span>
              <span>Ir al Sitio Público</span>
            </Link>
          </div>
        </aside>

        {/* Overlay móvil cuando sidebar está abierta */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 md:hidden"
          ></div>
        )}

        {/* ÁREA DE CONTENIDO */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
