'use client'

import { useEffect, useState, useCallback } from "react"
import { Evento } from "@/types/evento"
import {
  obtenerFavoritos,
  agregarFavorito,
  eliminarFavorito,
} from "@/services/favoritos.service"

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<Evento[]>([])
  const [cargando, setCargando] = useState(true)

  const cargar = useCallback(async () => {
    setCargando(true)
    try {
      const data = await obtenerFavoritos()
      setFavoritos(data)
    } catch {
      setFavoritos([])
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    cargar()
  }, [cargar])

  function esFavorito(eventId: string): boolean {
    return favoritos.some((e) => e.id === eventId)
  }

  async function toggleFavorito(eventId: string): Promise<boolean> {
    const yaEsFavorito = esFavorito(eventId)
    if (yaEsFavorito) {
      await eliminarFavorito(eventId)
      setFavoritos((prev) => prev.filter((e) => e.id !== eventId))
      return false
    } else {
      await agregarFavorito(eventId)
      await cargar()
      return true
    }
  }

  return { favoritos, cargando, esFavorito, toggleFavorito, recargar: cargar }
}
