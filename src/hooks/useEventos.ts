'use client'

import { useEffect, useState } from "react"
import { Evento } from "@/types/evento"
import { obtenerEventos } from "@/services/eventos.service"

export function useEventos() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    obtenerEventos()
      .then(setEventos)
      .finally(() => setCargando(false))
  }, [])

  return { eventos, cargando }
}