'use client'

import { useFavoritos } from "@/hooks/useFavoritos"
import { EventoImagen } from "@/components/EventoImagen"
import Link from "next/link"

export default function FavoritosPage() {
  const { favoritos, cargando, toggleFavorito } = useFavoritos()

  if (cargando) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Mis Favoritos</h1>
        <p className="text-gray-500">Cargando tus eventos favoritos...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="text-amber-400">★</span> Mis Favoritos
          </h1>
          <p className="text-xs text-slate-400 mt-1">Eventos que has guardado para no perderte nada</p>
        </div>
        <Link
          href="/eventos"
          className="text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        >
          + Explorar más eventos
        </Link>
      </div>

      {favoritos.length === 0 ? (
        <div className="text-center py-16 border border-slate-800 rounded-2xl bg-slate-900/60">
          <span className="text-4xl">★</span>
          <p className="text-lg font-bold text-white mt-3 mb-1">
            No tienes eventos guardados como favoritos
          </p>
          <p className="text-xs text-slate-400 mb-6 max-w-sm mx-auto">
            Explora el catálogo y marca los eventos que más te interesen con la estrella para tenerlos siempre a mano.
          </p>
          <Link
            href="/eventos"
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-[0_0_20px_rgba(37,99,235,0.45)] transition"
          >
            Ver Catálogo de Eventos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {favoritos.map((evento) => {
            const fechaFormateada = new Date(evento.date).toLocaleDateString("es-CO", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })

            const esGratis = Number(evento.price) === 0
            const precioFormateado = esGratis
              ? "Gratis"
              : `$${Number(evento.price).toLocaleString("es-CO")}`

            return (
              <div
                key={evento.id}
                className="border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-900/70 shadow-lg flex flex-col justify-between hover:border-slate-700 transition"
              >
                <div>
                  <EventoImagen evento={evento} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <h3 className="font-bold text-base text-white">{evento.name}</h3>
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
                      <p className="text-xs text-slate-400 line-clamp-2 mb-2 leading-relaxed">
                        {evento.description}
                      </p>
                    )}
                    <div className="text-xs text-slate-400 flex flex-col gap-1 mt-3 pt-2 border-t border-slate-800">
                      <span>📍 {evento.location}</span>
                      <span>📅 {fechaFormateada}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 flex justify-end">
                  <button
                    type="button"
                    onClick={() => toggleFavorito(evento.id)}
                    className="text-xs text-red-400 hover:text-red-300 font-medium py-1 hover:underline transition"
                  >
                    Quitar de favoritos
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}