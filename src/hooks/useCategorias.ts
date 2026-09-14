'use client'

import { useEffect, useState } from "react"
import { Categoria } from "@/types/categoria"
import { obtenerCategorias } from "@/services/categorias.service"

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    obtenerCategorias()
      .then(setCategorias)
      .finally(() => setCargando(false))
  }, [])

  return { categorias, cargando }
}