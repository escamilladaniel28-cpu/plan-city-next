'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Categoria } from "@/types/categoria"
import {
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
  obtenerCategorias,
} from "@/services/categorias.service"

// Función auxiliar para asignar icono temático según el nombre de la categoría
function getCategoryIcon(name: string): string {
  const lower = name.toLowerCase()
  if (lower.includes("gala") || lower.includes("vip") || lower.includes("lujo")) return "👑"
  if (lower.includes("conferencia") || lower.includes("liderazgo") || lower.includes("negocio")) return "👥"
  if (lower.includes("taller") || lower.includes("técnico") || lower.includes("tech") || lower.includes("trabajo")) return "💼"
  if (lower.includes("cine") || lower.includes("película") || lower.includes("festival")) return "🎬"
  if (lower.includes("música") || lower.includes("concierto") || lower.includes("sonido")) return "🎵"
  if (lower.includes("arte") || lower.includes("teatro") || lower.includes("cultura")) return "🎨"
  if (lower.includes("gastronom") || lower.includes("comida") || lower.includes("vino")) return "🍷"
  if (lower.includes("deporte") || lower.includes("fitness")) return "⚡"
  return "🏷️"
}

export default function AdminCategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [search, setSearch] = useState("")
  const [catName, setCatName] = useState("")
  const [catDesc, setCatDesc] = useState("")
  const [catEditId, setCatEditId] = useState<string | null>(null)
  const [catError, setCatError] = useState("")
  const [cargando, setCargando] = useState(true)
  const [showModal, setShowModal] = useState(false)

  async function cargarCategorias() {
    setCargando(true)
    try {
      const data = await obtenerCategorias()
      setCategorias(data)
    } catch {
      setCatError("Error al cargar categorías")
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarCategorias()
  }, [])

  async function handleCatSubmit(e: React.FormEvent) {
    e.preventDefault()
    setCatError("")

    try {
      if (catEditId) {
        await actualizarCategoria(catEditId, { name: catName, description: catDesc })
      } else {
        await crearCategoria({ name: catName, description: catDesc })
      }

      setCatName("")
      setCatDesc("")
      setCatEditId(null)
      setShowModal(false)
      cargarCategorias()
    } catch {
      setCatError("Ocurrió un error al guardar la categoría")
    }
  }

  function handleCatEditar(categoria: Categoria) {
    setCatEditId(categoria.id)
    setCatName(categoria.name)
    setCatDesc(categoria.description ?? "")
    setShowModal(true)
  }

  async function handleCatEliminar(id: string) {
    if (!confirm("¿Seguro que deseas eliminar esta categoría?")) return
    try {
      await eliminarCategoria(id)
      cargarCategorias()
    } catch {
      setCatError("No se pudo eliminar la categoría. Asegúrate de que no tenga eventos asociados.")
    }
  }

  function handleNuevaCategoria() {
    setCatEditId(null)
    setCatName("")
    setCatDesc("")
    setCatError("")
    setShowModal(true)
  }

  const filteredCategorias = categorias.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      {/* HEADER DEL PANEL (como en Screen 4 del Mockup) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Categories Panel
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Gestión y clasificación de categorías temáticas de eventos
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Buscador de Categorías */}
          <div className="relative flex-1 sm:w-56">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#090D17] border border-slate-700/80 rounded-full pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition"
            />
          </div>

          {/* Botón Dorado + Nueva Categoría */}
          <button
            onClick={handleNuevaCategoria}
            className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold px-4 py-1.5 rounded-full text-xs shadow-[0_0_15px_rgba(245,158,11,0.35)] hover:brightness-110 active:scale-95 transition cursor-pointer whitespace-nowrap"
          >
            + Nueva Categoría
          </button>
        </div>
      </div>

      {catError && (
        <div className="mb-6 p-3 bg-red-950/50 border border-red-800/60 rounded-xl text-red-300 text-xs">
          {catError}
        </div>
      )}

      {/* CUADRÍCULA DE TARJETAS DE CATEGORÍAS (como en Screen 4) */}
      {cargando ? (
        <div className="py-16 text-center text-sm text-slate-400">
          Cargando panel de categorías...
        </div>
      ) : filteredCategorias.length === 0 ? (
        <div className="py-16 text-center text-sm text-slate-400 bg-[#0c0c10] border border-zinc-800 rounded-2xl p-8">
          No se encontraron categorías. Haz clic en <span className="text-amber-400 font-semibold">+ Nueva Categoría</span> para comenzar.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategorias.map((cat) => {
            const icon = getCategoryIcon(cat.name)

            return (
              <div
                key={cat.id}
                className="group relative bg-[#0d0d12]/90 border border-zinc-800/90 hover:border-amber-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-300 backdrop-blur-md"
              >
                <div>
                  {/* Encabezado de la tarjeta */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl shrink-0 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                        {icon}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-amber-400 group-hover:text-amber-300 transition">
                          {cat.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                          {cat.description || "Categoría temática activa en Eventure"}
                        </p>
                      </div>
                    </div>

                    {/* Acciones Editar y Eliminar */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleCatEditar(cat)}
                        title="Editar"
                        className="text-slate-400 hover:text-blue-400 p-1 rounded-md hover:bg-slate-800 transition text-xs"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleCatEliminar(cat.id)}
                        title="Eliminar"
                        className="text-slate-400 hover:text-red-400 p-1 rounded-md hover:bg-slate-800 transition text-xs"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* Estadísticas de la categoría (como en el mockup) */}
                  <div className="space-y-1 text-[11px] text-slate-400 border-t border-slate-800/80 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span>Eventos activos:</span>
                      <span className="text-slate-200 font-semibold">Disponibles</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estilo de acceso:</span>
                      <span className="text-amber-400/90 font-medium">Estilo VIP: Sí/No</span>
                    </div>
                  </div>
                </div>

                {/* Botón Píldora Azul Eléctrico: Ver Eventos */}
                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={`/eventos?categoryId=${cat.id}`}
                    className="w-full text-center py-2 px-4 rounded-full border border-blue-500/60 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-semibold shadow-[0_0_12px_rgba(37,99,235,0.2)] hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transition duration-200"
                  >
                    👁️ Ver Eventos
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* MODAL PARA CREAR / EDITAR CATEGORÍA */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d0d12] border border-amber-500/30 rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(245,158,11,0.1)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">🏷️</span>
                {catEditId ? "Editar Categoría" : "Crear Nueva Categoría"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCatSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">Nombre de la Categoría</label>
                <input
                  type="text"
                  placeholder="Ej: Galas de Gala, Conferencias Tech..."
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  required
                  className="bg-[#060608] border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-blue-500 transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">Descripción</label>
                <textarea
                  placeholder="Detalles y enfoque de los eventos en esta categoría..."
                  value={catDesc}
                  onChange={(e) => setCatDesc(e.target.value)}
                  rows={3}
                  className="bg-[#060608] border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-blue-500 transition"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 text-xs font-black shadow-[0_0_15px_rgba(245,158,11,0.35)] hover:brightness-110 transition cursor-pointer"
                >
                  {catEditId ? "Guardar Cambios" : "Crear Categoría"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
