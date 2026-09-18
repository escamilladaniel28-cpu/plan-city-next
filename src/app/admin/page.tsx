'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { obtenerCategorias } from "@/services/categorias.service"
import { obtenerEventos } from "@/services/eventos.service"
import { obtenerUsuarios } from "@/services/usuarios.service"

export default function AdminDashboardPage() {
  const [numEventos, setNumEventos] = useState<number | null>(null)
  const [numCategorias, setNumCategorias] = useState<number | null>(null)
  const [numUsuarios, setNumUsuarios] = useState<number | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargarMetricas() {
      try {
        const [eventos, categorias, usuarios] = await Promise.allSettled([
          obtenerEventos(),
          obtenerCategorias(),
          obtenerUsuarios(),
        ])

        if (eventos.status === "fulfilled") setNumEventos(eventos.value.length)
        if (categorias.status === "fulfilled") setNumCategorias(categorias.value.length)
        if (usuarios.status === "fulfilled") setNumUsuarios(usuarios.value.length)
      } finally {
        setCargando(false)
      }
    }

    cargarMetricas()
  }, [])

  return (
    <div>
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight">
          Resumen Ejecutivo
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Bienvenido al centro de operaciones de Eventure. Monitorea métricas clave y accede a cada panel especializado.
        </p>
      </div>

      {/* Tarjetas de Métricas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-[#0d0d12]/90 border border-zinc-800/90 rounded-2xl p-5 shadow-lg flex items-center justify-between backdrop-blur-md">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Eventos Activos</p>
            <p className="text-3xl font-black text-blue-400 mt-1">
              {cargando ? "..." : numEventos ?? 0}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl">
            📅
          </div>
        </div>

        <div className="bg-[#0d0d12]/90 border border-zinc-800/90 rounded-2xl p-5 shadow-lg flex items-center justify-between backdrop-blur-md">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Categorías Registradas</p>
            <p className="text-3xl font-black text-amber-400 mt-1">
              {cargando ? "..." : numCategorias ?? 0}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl">
            🏷️
          </div>
        </div>

        <div className="bg-[#0d0d12]/90 border border-zinc-800/90 rounded-2xl p-5 shadow-lg flex items-center justify-between backdrop-blur-md">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Usuarios en Sistema</p>
            <p className="text-3xl font-black text-slate-100 mt-1">
              {cargando ? "..." : numUsuarios ?? 0}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl">
            👥
          </div>
        </div>
      </div>

      {/* Hub de los 3 Subpaneles */}
      <h2 className="text-lg font-bold text-white mb-4">Paneles de Gestión</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subpanel 1: Events Panel */}
        <Link
          href="/admin/eventos"
          className="group bg-[#0d0d12]/90 border border-zinc-800/90 rounded-2xl p-6 shadow-md hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] transition flex flex-col justify-between backdrop-blur-md"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">
              📅
            </div>
            <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition">
              Events Panel
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Supervisión de aforos, barras de capacidad, precios, ubicaciones y publicación de eventos.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-blue-400">
            <span>Abrir panel de eventos</span>
            <span className="group-hover:translate-x-1 transition">→</span>
          </div>
        </Link>

        {/* Subpanel 2: Categories Panel */}
        <Link
          href="/admin/categorias"
          className="group bg-[#0d0d12]/90 border border-zinc-800/90 rounded-2xl p-6 shadow-md hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition flex flex-col justify-between backdrop-blur-md"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">
              🏷️
            </div>
            <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition">
              Categories Panel
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Organiza temáticas: Galas de Gala, Conferencias Tech, Talleres y Festivales de Cine.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-amber-400">
            <span>Abrir panel de categorías</span>
            <span className="group-hover:translate-x-1 transition">→</span>
          </div>
        </Link>

        {/* Subpanel 3: Users Panel */}
        <Link
          href="/admin/usuarios"
          className="group bg-[#0d0d12]/90 border border-zinc-800/90 rounded-2xl p-6 shadow-md hover:border-slate-600 hover:shadow-[0_0_20px_rgba(148,163,184,0.15)] transition flex flex-col justify-between backdrop-blur-md"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">
              👥
            </div>
            <h3 className="font-bold text-lg text-white group-hover:text-slate-200 transition">
              Users Panel
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Directorio general de usuarios registrados, verificación de roles activos y accesos.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Abrir panel de usuarios</span>
            <span className="group-hover:translate-x-1 transition">→</span>
          </div>
        </Link>
      </div>
    </div>
  )
}
