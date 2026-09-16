'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { EventureLogo } from "@/components/EventureLogo"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col">
      {/* TOP BAR del Dashboard (como en Screens 4, 5, 6) */}
      <header className="border-b border-slate-800/80 bg-[#090D17]/95 backdrop-blur-md sticky top-0 z-50 h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
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
              className="w-full bg-[#06080F] border border-slate-700/80 focus:border-blue-500 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500 transition shadow-inner"
            />
          </div>
        </div>

        {/* Perfil de Usuario & Accesos */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-amber-400 px-3 py-1.5 rounded-full border border-slate-800 hover:border-amber-500/30 transition hidden lg:inline-block"
          >
            ← Volver a la Web
          </Link>

          <div className="flex items-center gap-2 bg-[#0C101B] border border-slate-700/80 px-3 py-1.5 rounded-full text-xs text-slate-200 shadow-xs">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold flex items-center justify-center text-[10px]">
              A
            </div>
            <span className="font-semibold text-white hidden sm:inline">Carlos M.</span>
            <span className="text-[10px] text-slate-400">▾</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* SIDEBAR LATERAL (como en Screens 4, 5, 6) */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-40 w-60 bg-[#080B14] border-r border-slate-800/80 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
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
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}

            <div className="my-3 border-t border-slate-800/80"></div>

            <div className="flex items-center gap-3 px-3.5 py-2 text-xs text-slate-500">
              <span className="text-base">📈</span>
              <span>Analíticas (Pronto)</span>
            </div>

            <div className="flex items-center gap-3 px-3.5 py-2 text-xs text-slate-500">
              <span className="text-base">⚙️</span>
              <span>Ajustes</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 px-2">
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
