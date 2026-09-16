'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Evento } from "@/types/evento"
import { Categoria } from "@/types/categoria"
import { obtenerCategorias } from "@/services/categorias.service"
import {
  crearEvento,
  actualizarEvento,
  eliminarEvento,
  obtenerEventos,
} from "@/services/eventos.service"
import { EventoImagen } from "@/components/EventoImagen"
import { getEventoImageUrl } from "@/lib/utils"

export default function AdminEventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [cargando, setCargando] = useState(true)
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [showModal, setShowModal] = useState(false)

  // Campos formulario
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [price, setPrice] = useState(0)
  const [capacity, setCapacity] = useState(50)
  const [categoryId, setCategoryId] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [editId, setEditId] = useState<string | null>(null)
  const [error, setError] = useState("")

  async function cargarDatos() {
    setCargando(true)
    try {
      const [dataEventos, dataCats] = await Promise.all([
        obtenerEventos(),
        obtenerCategorias(),
      ])
      setEventos(dataEventos)
      setCategorias(dataCats)
      if (dataCats.length > 0 && !categoryId) {
        setCategoryId(dataCats[0].id)
      }
    } catch {
      setError("Error al cargar los datos del servidor")
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!categoryId) {
      setError("Debes seleccionar una categoría para el evento")
      return
    }

    try {
      const isoDate = new Date(date).toISOString()
      const imagesPayload = imageUrl.trim() ? [imageUrl.trim()] : []

      if (editId) {
        await actualizarEvento(editId, {
          name,
          description,
          date: isoDate,
          location,
          price: Number(price),
          capacity: Number(capacity),
          categoryId,
          images: imagesPayload,
        })
      } else {
        await crearEvento({
          name,
          description,
          date: isoDate,
          location,
          price: Number(price),
          capacity: Number(capacity),
          categoryId,
          images: imagesPayload,
        })
      }

      limpiarFormulario()
      setShowModal(false)
      cargarDatos()
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al guardar el evento")
    }
  }

  function handleEditar(evento: Evento) {
    setEditId(evento.id)
    setName(evento.name)
    setDescription(evento.description ?? "")
    setDate(evento.date ? new Date(evento.date).toISOString().slice(0, 16) : "")
    setLocation(evento.location)
    setPrice(Number(evento.price))
    setCapacity(evento.capacity)
    setCategoryId(evento.categoryId)
    const img = getEventoImageUrl(evento)
    setImageUrl(img ?? "")
    setShowModal(true)
  }

  async function handleEliminar(id: string) {
    if (!confirm("¿Seguro que deseas eliminar este evento?")) return
    try {
      await eliminarEvento(id)
      cargarDatos()
    } catch {
      setError("No se pudo eliminar el evento")
    }
  }

  function limpiarFormulario() {
    setEditId(null)
    setName("")
    setDescription("")
    setDate("")
    setLocation("")
    setPrice(0)
    setCapacity(50)
    setImageUrl("")
    if (categorias.length > 0) setCategoryId(categorias[0].id)
  }

  function handleNuevoEvento() {
    limpiarFormulario()
    setError("")
    setShowModal(true)
  }

  const filteredEventos = eventos.filter((ev) => {
    const matchSearch =
      ev.name.toLowerCase().includes(search.toLowerCase()) ||
      ev.location.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCategory ? ev.categoryId === filterCategory : true
    return matchSearch && matchCat
  })

  return (
    <div>
      {/* HEADER DEL PANEL (como en Screen 5 del Mockup) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Events Panel
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Supervisión, aforo y publicación de eventos en tiempo real
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Buscador */}
          <div className="relative flex-1 sm:w-52">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#090D17] border border-slate-700/80 rounded-full pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition"
            />
          </div>

          {/* Filtro por Categoría */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#090D17] border border-slate-700/80 rounded-full px-3 py-1.5 text-xs text-slate-300 focus:outline-hidden focus:border-blue-500"
          >
            <option value="">Todas las categorías</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Botón Dorado + Crear Evento */}
          <button
            onClick={handleNuevoEvento}
            className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold px-4 py-1.5 rounded-full text-xs shadow-[0_0_15px_rgba(245,158,11,0.35)] hover:brightness-110 active:scale-95 transition cursor-pointer whitespace-nowrap"
          >
            + Crear Evento
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-950/50 border border-red-800/60 rounded-xl text-red-300 text-xs">
          {error}
        </div>
      )}

      {/* FILAS ALARGADAS DE EVENTOS (como en Screen 5) */}
      {cargando ? (
        <div className="py-16 text-center text-sm text-slate-400">
          Cargando listado de eventos...
        </div>
      ) : filteredEventos.length === 0 ? (
        <div className="py-16 text-center text-sm text-slate-400 bg-[#0A0E18] border border-slate-800 rounded-2xl p-8">
          No se encontraron eventos activos. Haz clic en <span className="text-amber-400 font-semibold">+ Crear Evento</span> para publicar el primero.
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {filteredEventos.map((evento) => {
            const dateObj = new Date(evento.date)
            const dia = String(dateObj.getDate()).padStart(2, "0")
            const mes = String(dateObj.getMonth() + 1).padStart(2, "0")
            const precio = Number(evento.price) === 0 ? "Gratis" : `$${Number(evento.price).toLocaleString("es-CO")}`

            // Aforo simulado / ocupación de progreso para la barra azul
            const ocupacionPorcentaje = Math.min(85, Math.max(30, (evento.name.length * 7) % 95))
            const asistentesActuales = Math.round((evento.capacity * ocupacionPorcentaje) / 100)

            return (
              <div
                key={evento.id}
                className="group bg-[#0C101B]/90 border border-slate-800/90 hover:border-amber-500/40 rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-md backdrop-blur-md transition duration-200"
              >
                {/* Lado Izquierdo: Badge de Fecha + Imagen + Título */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  {/* Badge Dorado de Fecha [Día / Mes] */}
                  <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl px-2.5 py-1.5 flex flex-col items-center justify-center min-w-[50px] shrink-0 text-center shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                    <span className="text-[10px] uppercase font-bold text-amber-500/80">DÍA</span>
                    <span className="text-base font-black text-amber-300 leading-none">{dia}</span>
                    <span className="text-[9px] text-amber-500/80 font-medium">/{mes}</span>
                  </div>

                  {/* Imagen en miniatura */}
                  <EventoImagen
                    evento={evento}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-800"
                  />

                  {/* Título y metadatos */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-400 transition truncate">
                        {evento.name}
                      </h3>
                      <span className="text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold shrink-0">
                        {precio}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      📍 {evento.location} • 🏷️ {evento.category?.name || "Sin categoría"}
                    </p>
                  </div>
                </div>

                {/* Centro: Barra de Progreso de Capacidad (Azul Eléctrico como en Mockup) */}
                <div className="flex items-center gap-3 w-full lg:w-auto shrink-0 py-1 lg:py-0 border-t lg:border-t-0 border-slate-800/60 lg:border-none">
                  <span className="text-xs font-semibold text-slate-300 whitespace-nowrap">
                    {asistentesActuales} / {evento.capacity}
                  </span>
                  <div className="w-28 sm:w-36 h-2 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.7)]"
                      style={{ width: `${ocupacionPorcentaje}%` }}
                    ></div>
                  </div>
                </div>

                {/* Lado Derecho: Píldora de Estado + Botones de Acción */}
                <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto shrink-0">
                  {/* Píldora Enlace Activo en Azul Eléctrico */}
                  <span className="px-3 py-1 rounded-full text-xs font-semibold border border-blue-500/50 bg-blue-600/15 text-blue-400 shadow-[0_0_12px_rgba(37,99,235,0.25)] whitespace-nowrap">
                    Enlace Activo
                  </span>

                  {/* Acciones de Edición y Eliminación */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleEditar(evento)}
                      title="Editar Evento"
                      className="p-1.5 rounded-lg border border-slate-700/80 text-blue-400 hover:bg-slate-800 transition text-xs"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleEliminar(evento.id)}
                      title="Eliminar Evento"
                      className="p-1.5 rounded-lg border border-red-800/60 text-red-400 hover:bg-red-950/40 transition text-xs"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* MODAL PARA CREAR / EDITAR EVENTO */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0C101B] border border-amber-500/30 rounded-2xl p-6 sm:p-7 max-w-lg w-full shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(245,158,11,0.1)] my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">📅</span>
                {editId ? "Editar Evento" : "Publicar Nuevo Evento"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-300">Nombre del Evento</label>
                <input
                  type="text"
                  placeholder="Ej: Gala Benéfica Anual 2026"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-white focus:outline-hidden focus:border-blue-500 transition"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-300">Categoría</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  className="bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-white focus:outline-hidden focus:border-blue-500"
                >
                  <option value="" className="bg-slate-950">Selecciona una categoría</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id} className="bg-slate-950">
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-300">Descripción</label>
                <textarea
                  placeholder="Detalles sobre el evento..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-sm text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-300">Fecha y Hora</label>
                  <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="bg-[#070A12] border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-300">Ubicación</label>
                  <input
                    type="text"
                    placeholder="Lugar / Auditorio"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="bg-[#070A12] border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-300">Precio ($)</label>
                  <input
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                    className="bg-[#070A12] border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-300">Capacidad Aforo</label>
                  <input
                    type="number"
                    min="1"
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    required
                    className="bg-[#070A12] border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-300">URL Imagen (opcional)</label>
                <input
                  type="url"
                  placeholder="https://ejemplo.com/flyer.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="bg-[#070A12] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-blue-500"
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
                  {editId ? "Guardar Cambios" : "Publicar Evento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
