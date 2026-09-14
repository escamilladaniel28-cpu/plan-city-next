import Link from "next/link"

export function Header() {
  return (
    <header className="p-4 border-b flex items-center justify-between">
      <h1 className="font-bold text-lg">PlanCity</h1>
      <nav className="flex gap-4">
        <Link href="/">Inicio</Link>
        <Link href="/categorias">Categorías</Link>
        <Link href="/eventos">Eventos</Link>
      </nav>
    </header>
  )
}