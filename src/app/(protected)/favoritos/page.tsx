import { cookies } from "next/headers"
import Link from "next/link"

export default async function FavoritosPage() {
  const cookieStore = await cookies()
  const rol = cookieStore.get("session")?.value

  return (
    <div className="p-4">
      <h1 className="font-bold text-lg">Favoritos</h1>

      {rol === "admin" && (
        <Link href="/admin" className="border rounded px-4 py-2 inline-block mt-4">
          Ir al Panel de Administración
        </Link>
      )}
    </div>
  )
}