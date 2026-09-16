'use client'

import { useEffect, useState, useCallback } from "react"
import { Evento } from "@/types/evento"
import { obtenerEventos, FiltrosEvento } from "@/services/eventos.service"

export function useEventos(filtros?: FiltrosEvento) {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [cargando, setCargando] = useState(true)

  const cargarEventos = useCallback(async () => {
    setCargando(true)
    try {
      const data = await obtenerEventos(filtros)
      setEventos(data)
    } catch (err) {
      console.error(err)
    } finally {
      setCargando(false)
    }
  }, [filtros?.search, filtros?.categoryId])

  useEffect(() => {
    cargarEventos()
  }, [cargarEventos])

  return { eventos, cargando, recargar: cargarEventos }
}