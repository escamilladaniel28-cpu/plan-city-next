import { ListaCategorias } from "@/components/ListaCategorias"
import { ListaEventos } from "@/components/ListaEventos"

export default function EventosPage() {
  return (
    <div className="flex flex-1">
      <section className="w-3/4 p-4 flex flex-col items-center text-center">
        <h2 className="font-bold mb-2">Eventos</h2>
        <ListaEventos />
      </section>

      <aside className="w-1/4 border-l p-4">
        <h2 className="font-bold mb-2">Categorías</h2>
        <ListaCategorias />
      </aside>
    </div>
  )
}