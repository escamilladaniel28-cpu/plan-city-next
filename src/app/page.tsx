import Link from "next/link"

export default function Home() {
  return (
    <div className="p-4 flex flex-col items-center justify-center text-center gap-4">
      <h2 className="text-2xl font-bold">Bienvenido a PlanCity</h2>
      <p>Descubre eventos y categorías cerca de ti.</p>

      <div className="flex gap-4">
        <Link
          href="/categorias"
          className="border rounded px-4 py-2"
        >
          Ver Categorías
        </Link>
        <Link
          href="/eventos"
          className="border rounded px-4 py-2"
        >
          Ver Eventos
        </Link>
      </div>
    </div>
  )
}