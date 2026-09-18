import Link from "next/link"
import { cookies } from "next/headers"
import { BotonLogout } from "./BotonLogout"
import { EventureLogo } from "./EventureLogo"

export async function Header() {
  const cookieStore = await cookies()
  const hasSession = !!cookieStore.get("session")?.value
  const role = cookieStore.get("role")?.value
  const rawUserName = cookieStore.get("userName")?.value
  let userName = null
  if (rawUserName) {
    try {
      userName = decodeURIComponent(rawUserName)
    } catch {
      userName = rawUserName
    }
  }

  return (
    <header className="border-b border-zinc-800/80 bg-[#050507]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo EVENTURE */}
        <div className="flex items-center gap-8">
          <EventureLogo />

          {/* Navegación general */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-zinc-800/60 rounded-full transition"
            >
              Explorar
            </Link>
            <Link
              href="/eventos"
              className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-zinc-800/60 rounded-full transition"
            >
              Eventos
            </Link>
            <Link
              href="/categorias"
              className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-zinc-800/60 rounded-full transition"
            >
              Categorías
            </Link>
          </nav>
        </div>

        {/* Acciones de usuario / Autenticación */}
        <div className="flex items-center gap-3">
          {hasSession ? (
            <div className="flex items-center gap-3">
              {userName && (
                <div className="hidden lg:flex items-center gap-2 bg-[#0e0e12] border border-zinc-700/80 px-3 py-1.5 rounded-full text-xs text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold flex items-center justify-center text-[10px]">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-white max-w-[120px] truncate">
                    {userName}
                  </span>
                </div>
              )}

              <Link
                href="/favoritos"
                className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition flex items-center gap-1.5"
              >
                <span className="text-amber-400">★</span>
                <span className="hidden sm:inline">Favoritos</span>
              </Link>

              {role === "admin" && (
                <Link
                  href="/admin"
                  className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 text-xs px-3.5 py-1.5 rounded-full font-bold transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.35)] hover:brightness-110"
                >
                  <span>⚙️</span>
                  <span>Panel Admin</span>
                </Link>
              )}

              <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block"></div>

              <BotonLogout />
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/register"
                className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition hidden sm:inline-block"
              >
                Registrarse
              </Link>
              <Link
                href="/login"
                className="px-5 py-1.5 text-sm font-semibold text-white border border-slate-700 hover:border-amber-400 hover:text-amber-400 rounded-full transition shadow-xs"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}