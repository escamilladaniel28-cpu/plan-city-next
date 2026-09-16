import Link from "next/link"

interface EventureLogoProps {
  className?: string
  iconSize?: number
  showText?: boolean
  linkToHome?: boolean
}

export function EventureLogo({
  className = "",
  iconSize = 28,
  showText = true,
  linkToHome = true,
}: EventureLogoProps) {
  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Isotipo geométrico 'E' en degradado azul y dorado */}
      <div
        className="relative flex items-center justify-center shrink-0 rounded-lg overflow-hidden shadow-[0_0_12px_rgba(37,99,235,0.35)]"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Fondo oscuro con borde sutil */}
          <rect width="32" height="32" rx="6" fill="#0B1120" stroke="#1E293B" strokeWidth="1" />
          
          {/* Barra vertical izquierda - Azul Eléctrico brillante */}
          <path
            d="M7 6H13V26H7V6Z"
            fill="url(#blueGrad)"
          />
          
          {/* Barra horizontal superior - Dorado Metálico */}
          <path
            d="M13 6H25V10H13V6Z"
            fill="url(#goldGrad)"
          />
          
          {/* Barra horizontal media - Azul y Dorado conector */}
          <path
            d="M13 14H21V18H13V14Z"
            fill="url(#goldGrad)"
          />
          
          {/* Barra horizontal inferior - Dorado Metálico */}
          <path
            d="M13 22H25V26H13V22Z"
            fill="url(#goldGrad)"
          />

          {/* Destello de brillo */}
          <circle cx="23" cy="8" r="1.5" fill="#FFFFFF" opacity="0.8" />

          <defs>
            <linearGradient id="blueGrad" x1="7" y1="6" x2="13" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="13" y1="6" x2="25" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE047" />
              <stop offset="0.4" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <span className="font-black tracking-wider text-lg uppercase text-white flex items-center">
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            EVEN
          </span>
          <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent ml-0.5">
            TURE
          </span>
        </span>
      )}
    </div>
  )

  if (linkToHome) {
    return (
      <Link href="/" className="hover:opacity-90 transition inline-block">
        {content}
      </Link>
    )
  }

  return content
}
