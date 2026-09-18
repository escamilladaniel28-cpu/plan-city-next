'use client'

import { useEventos } from "@/hooks/useEventos"
import { useFavoritos } from "@/hooks/useFavoritos"
import { EventoImagen } from "./EventoImagen"

interface ListaEventosProps {
  search?: string
  categoryId?: string
}

export function ListaEventos({ search, categoryId }: ListaEventosProps = {}) {
  const { eventos, cargando } = useEventos({ search, categoryId })
  const { esFavorito, toggleFavorito } = useFavoritos()

  if (cargando) return <p className="text-slate-500 py-6 text-center">Cargando eventos...</p>
  if (eventos.length === 0) {
    return <p className="text-slate-500 py-6 text-center">No se encontraron eventos con los filtros seleccionados.</p>
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {eventos.map((evento) => {
        const fechaFormateada = new Date(evento.date).toLocaleDateString("es-CO", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })

        const esGratis = Number(evento.price) === 0
        const precioFormateado = esGratis
          ? "Gratis"
          : `$${Number(evento.price).toLocaleString("es-CO")}`

        const favorito = esFavorito(evento.id)

        return (
          <li
            key={evento.id}
            className="border border-zinc-800/90 rounded-2xl overflow-hidden flex flex-col bg-[#0c0c10]/90 hover:bg-[#111116] text-left shadow-lg hover:shadow-blue-600/10 hover:border-zinc-700 transition relative group"
          >
            <EventoImagen evento={evento} />

            <button
              type="button"
              onClick={() => toggleFavorito(evento.id)}
              title={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
              className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md border border-zinc-700/80 p-1.5 rounded-full shadow-md hover:scale-110 active:scale-95 transition text-sm flex items-center justify-center"
            >
              {favorito ? (
                <span className="text-amber-400">★</span>
              ) : (
                <span className="text-slate-400 hover:text-amber-400">☆</span>
              )}
            </button>

            <div className="p-4 flex flex-col flex-1">
              <div className="flex justify-between items-start gap-2 mb-1.5">
                <h3 className="font-bold text-base text-white line-clamp-1 group-hover:text-blue-400 transition">
                  {evento.name}
                </h3>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                    esGratis
                      ? "text-blue-300 bg-blue-950/50 border border-blue-500/30"
                      : "text-amber-400 bg-amber-950/40 border border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.2)]"
                  }`}
                >
                  {precioFormateado}
                </span>
              </div>

              {evento.description && (
                <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                  {evento.description}
                </p>
              )}

              <div className="mt-auto pt-3 text-xs text-slate-400 flex flex-col gap-1 border-t border-slate-800/80">
                <span className="flex items-center gap-1">📍 {evento.location}</span>
                <span className="flex items-center gap-1">📅 {fechaFormateada}</span>
                {evento.category && (
                  <span className="text-xs text-blue-400 font-semibold mt-0.5">
                    🏷️ {evento.category.name}
                  </span>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}