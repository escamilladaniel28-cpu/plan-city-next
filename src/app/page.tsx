import Link from "next/link"
import { ListaEventos } from "@/components/ListaEventos"

export default function Home() {
  return (
    <div className="relative overflow-hidden py-10 sm:py-16 px-4 max-w-7xl mx-auto">
      {/* Resplandores ambientales de fondo */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* HERO SECTION — 2 Columnas como en Screen 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-24">
        {/* Columna Izquierda: Titular y Botones */}
        <div className="lg:col-span-7 text-left">
          {/* Badge sutil */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold mb-6 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <span>✨</span>
            <span>Plataforma Premium de Eventos</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-4">
            <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Organiza y Gestiona
            </span>
            <span className="block text-white mt-1">
              Eventos de Clase Mundial
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed mb-8">
            Diseñado para organizadores visionarios y audiencias apasionadas. Explora experiencias exclusivas, reserva tus accesos y administra cada detalle en tiempo real.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            {/* Botón 1: Dorado Brillante */}
            <Link
              href="/register"
              className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-sm transition shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:brightness-110 active:scale-95"
            >
              Registrarte Gratis
            </Link>

            {/* Botón 2: Píldora de Cristal con Borde Metálico */}
            <Link
              href="/eventos"
              className="px-6 py-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-amber-400 border border-slate-700 hover:border-amber-500/50 font-semibold text-sm transition shadow-xs"
            >
              Ver Eventos Destacados
            </Link>
          </div>
        </div>

        {/* Columna Derecha: Ilustración Globo Terráqueo Dorado + Skyline */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <div className="relative w-72 sm:w-96 aspect-square flex items-center justify-center">
            {/* Halo dorado detrás */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-500/20 via-yellow-600/10 to-transparent blur-2xl"></div>

            {/* Ilustración SVG de Globo Dorado con Skyline Metropolitano */}
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full relative z-10 drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="globeGrad" cx="50%" cy="45%" r="50%">
                  <stop offset="0%" stopColor="#2A2010" />
                  <stop offset="60%" stopColor="#13151D" />
                  <stop offset="100%" stopColor="#080A10" />
                </radialGradient>
                <linearGradient id="goldLines" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE047" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <linearGradient id="skylineGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#FDE047" />
                  <stop offset="40%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#451A03" />
                </linearGradient>
              </defs>

              {/* Esfera base del globo */}
              <circle cx="200" cy="200" r="160" fill="url(#globeGrad)" stroke="url(#goldLines)" strokeWidth="2" />

              {/* Meridianos y paralelos dorados */}
              <ellipse cx="200" cy="200" rx="160" ry="60" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.4" fill="none" />
              <ellipse cx="200" cy="200" rx="160" ry="110" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.4" fill="none" />
              <ellipse cx="200" cy="200" rx="60" ry="160" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.4" fill="none" />
              <ellipse cx="200" cy="200" rx="110" ry="160" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.4" fill="none" />
              <line x1="40" y1="200" x2="360" y2="200" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="200" y1="40" x2="200" y2="360" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.6" />

              {/* Puntos luminosos en el mapa mundi */}
              <circle cx="160" cy="140" r="3" fill="#FDE047" className="animate-ping" />
              <circle cx="230" cy="120" r="3.5" fill="#FDE047" />
              <circle cx="270" cy="170" r="3" fill="#FDE047" />
              <circle cx="140" cy="220" r="2.5" fill="#60A5FA" />
              <circle cx="210" cy="240" r="3" fill="#60A5FA" />

              {/* Skyline de rascacielos dorados en la base del globo */}
              <path
                d="M70 290 L70 260 L85 260 L85 290 L95 290 L95 230 L110 230 L110 290 L120 290 L120 200 L130 180 L135 180 L135 290 L145 290 L145 240 L160 240 L160 290 L175 290 L175 160 L185 140 L195 160 L195 290 L210 290 L210 190 L225 190 L225 290 L240 290 L240 220 L255 220 L255 290 L270 290 L270 170 L285 170 L285 290 L300 290 L300 250 L315 250 L315 290 L330 290"
                stroke="url(#skylineGrad)"
                strokeWidth="3"
                fill="none"
              />
              
              {/* Reflejos de luz en edificios */}
              <line x1="185" y1="140" x2="185" y2="290" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.7" />
              <line x1="125" y1="190" x2="125" y2="290" stroke="#FDE047" strokeWidth="1" strokeOpacity="0.6" />
              <line x1="277" y1="180" x2="277" y2="290" stroke="#FDE047" strokeWidth="1" strokeOpacity="0.6" />

              {/* Luces en la base metropolitana */}
              <ellipse cx="200" cy="300" rx="140" ry="25" fill="#F59E0B" fillOpacity="0.15" />
            </svg>
          </div>
        </div>
      </div>

      {/* FILA DE 3 TARJETAS DESTACADAS (Como en Screen 3 del Mockup) */}
      <div className="mb-20">
        <h2 className="text-xs font-bold uppercase tracking-widest text-amber-400 text-left mb-4 flex items-center gap-2">
          <span>Categorías Principales</span>
          <span className="h-px bg-amber-500/30 flex-1"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta 1: Galas Benéficas */}
          <Link
            href="/eventos?search=Galas"
            className="group relative overflow-hidden rounded-2xl border border-amber-500/40 bg-slate-900/90 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] h-56 flex flex-col justify-end p-5"
          >
            {/* Fondo simulado con fotografía y gradiente oscuro */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(11,14,23,0.95) 20%, rgba(11,14,23,0.6) 60%, rgba(0,0,0,0.4) 100%), url('https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&auto=format&fit=crop&q=80')`,
              }}
            ></div>

            <div className="relative z-10 text-left">
              <span className="text-2xl mb-1 inline-block">👑</span>
              <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition">
                Galas Benéficas
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                Eventos exclusivos de etiqueta, subastas y recepciones VIP.
              </p>
            </div>
          </Link>

          {/* Tarjeta 2: Conferencias Tech */}
          <Link
            href="/eventos?search=Tech"
            className="group relative overflow-hidden rounded-2xl border border-amber-500/40 bg-slate-900/90 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(37,99,235,0.25)] h-56 flex flex-col justify-end p-5"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(11,14,23,0.95) 20%, rgba(11,14,23,0.6) 60%, rgba(0,0,0,0.4) 100%), url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80')`,
              }}
            ></div>

            <div className="relative z-10 text-left">
              <span className="text-2xl mb-1 inline-block">💡</span>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                Conferencias Tech
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                Líderes de innovación, inteligencia artificial y desarrollo digital.
              </p>
            </div>
          </Link>

          {/* Tarjeta 3: Festivales de Cine */}
          <Link
            href="/eventos?search=Cine"
            className="group relative overflow-hidden rounded-2xl border border-amber-500/40 bg-slate-900/90 hover:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] h-56 flex flex-col justify-end p-5"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(11,14,23,0.95) 20%, rgba(11,14,23,0.6) 60%, rgba(0,0,0,0.4) 100%), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80')`,
              }}
            ></div>

            <div className="relative z-10 text-left">
              <span className="text-2xl mb-1 inline-block">🎬</span>
              <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition">
                Festivales de Cine
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                Proyecciones premier, alfombras rojas y muestras cinematográficas.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* CATÁLOGO DE EVENTOS REALES EN BASE DE DATOS */}
      <div className="text-left">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Eventos Disponibles en Cartelera
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Consulta las fechas y ubicaciones disponibles directamente en la plataforma
            </p>
          </div>
          <Link
            href="/eventos"
            className="text-xs font-semibold text-amber-400 hover:underline"
          >
            Ver todos los eventos →
          </Link>
        </div>

        <ListaEventos />
      </div>
    </div>
  )
}