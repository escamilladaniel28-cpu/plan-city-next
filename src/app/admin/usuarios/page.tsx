'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Usuario } from "@/types/usuario"
import { obtenerUsuarios } from "@/services/usuarios.service"

export default function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [search, setSearch] = useState("")
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)

  // Campos para nuevo usuario
  const [newUserName, setNewUserName] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserPassword, setNewUserPassword] = useState("")
  const [creando, setCreando] = useState(false)
  const [modalError, setModalError] = useState("")

  async function cargarUsuarios() {
    setCargando(true)
    setError("")
    try {
      const data = await obtenerUsuarios()
      setUsuarios(data)
    } catch {
      setError("No se pudieron cargar los usuarios del sistema")
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault()
    setModalError("")
    setCreando(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
        }),
      })

      const data = await res.json()
      if (data.ok) {
        setNewUserName("")
        setNewUserEmail("")
        setNewUserPassword("")
        setShowModal(false)
        cargarUsuarios()
      } else {
        setModalError(data.error || "No se pudo crear el usuario")
      }
    } catch {
      setModalError("Error al registrar el usuario en el servidor")
    } finally {
      setCreando(false)
    }
  }

  const filteredUsuarios = usuarios.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  const totalAdmins = usuarios.filter((u) => u.role === "admin").length
  const totalUsers = usuarios.filter((u) => u.role === "user").length

  return (
    <div>
      {/* HEADER DEL PANEL (como en Screen 6 del Mockup) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Users Panel
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Supervisión de cuentas registradas, permisos y roles en la plataforma
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Buscador de Usuarios */}
          <div className="relative flex-1 sm:w-56">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#090D17] border border-slate-700/80 rounded-full pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition"
            />
          </div>

          <button
            onClick={cargarUsuarios}
            title="Refrescar lista"
            className="text-xs font-semibold border border-slate-700/80 bg-[#090D17] text-slate-300 hover:text-white p-2 rounded-full transition cursor-pointer"
          >
            🔄
          </button>

          {/* Botón Dorado + Add User (como en Mockup Screen 6) */}
          <button
            onClick={() => {
              setModalError("")
              setShowModal(true)
            }}
            className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold px-4 py-1.5 rounded-full text-xs shadow-[0_0_15px_rgba(245,158,11,0.35)] hover:brightness-110 active:scale-95 transition cursor-pointer whitespace-nowrap"
          >
            + Add User
          </button>
        </div>
      </div>

      {/* Resumen Superior */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#0C101B]/90 border border-slate-800 rounded-2xl p-4 shadow-md backdrop-blur-md">
          <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Total Cuentas</p>
          <p className="text-2xl font-black text-white mt-1">{usuarios.length}</p>
        </div>
        <div className="bg-[#0C101B]/90 border border-slate-800 rounded-2xl p-4 shadow-md backdrop-blur-md">
          <p className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">Administradores</p>
          <p className="text-2xl font-black text-amber-400 mt-1">{totalAdmins}</p>
        </div>
        <div className="bg-[#0C101B]/90 border border-slate-800 rounded-2xl p-4 shadow-md backdrop-blur-md">
          <p className="text-[11px] text-blue-400 font-semibold uppercase tracking-wider">Usuarios Estándar</p>
          <p className="text-2xl font-black text-blue-400 mt-1">{totalUsers}</p>
        </div>
      </div>

      {/* TABLA DE USUARIOS (como en Screen 6 del Mockup) */}
      <div className="bg-[#0C101B]/90 border border-slate-800/90 rounded-2xl overflow-hidden shadow-lg backdrop-blur-md">
        {error && (
          <div className="p-4 bg-red-950/50 border-b border-red-800/50 text-red-400 text-sm">
            {error}
          </div>
        )}

        {cargando ? (
          <p className="text-sm text-slate-400 py-16 text-center">Cargando lista de usuarios...</p>
        ) : filteredUsuarios.length === 0 ? (
          <p className="text-sm text-slate-400 py-16 text-center">No se encontraron usuarios registrados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#080B14] border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Nombre</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Rol</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4">Último Acceso</th>
                  <th className="p-4 text-right">Ajustes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {filteredUsuarios.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-slate-800/40 transition">
                    {/* Nombre con Avatar */}
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500/20 to-blue-500/20 border border-amber-500/40 flex items-center justify-center font-bold text-xs text-amber-400 shadow-xs shrink-0">
                        {usuario.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-white truncate max-w-[150px] sm:max-w-none">
                        {usuario.name}
                      </span>
                    </td>

                    {/* Email */}
                    <td className="p-4 text-slate-300">{usuario.email}</td>

                    {/* Rol Badge */}
                    <td className="p-4">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                          usuario.role === "admin"
                            ? "bg-amber-500/15 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]"
                            : "bg-slate-800/90 text-slate-300 border-slate-700"
                        }`}
                      >
                        {usuario.role === "admin" ? "Administrador" : "Asistente"}
                      </span>
                    </td>

                    {/* Estado: Activo en Azul Eléctrico (como en Screen 6) */}
                    <td className="p-4">
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold border border-blue-500/40 bg-blue-600/15 text-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.2)] whitespace-nowrap">
                        Activo
                      </span>
                    </td>

                    {/* Último Acceso / Fecha */}
                    <td className="p-4 text-xs text-slate-400 whitespace-nowrap">
                      {new Date(usuario.createdAt).toLocaleDateString("es-CO", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Ajustes / Acciones (Lápiz, Escudo, Papelera) */}
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          title="Editar"
                          onClick={() => alert(`Usuario: ${usuario.name} (${usuario.email})`)}
                          className="p-1 rounded text-blue-400 hover:bg-slate-800 transition text-xs"
                        >
                          ✏️
                        </button>
                        <button
                          title="Permisos de Seguridad"
                          onClick={() => alert(`Rol de usuario: ${usuario.role}`)}
                          className="p-1 rounded text-amber-400 hover:bg-slate-800 transition text-xs"
                        >
                          🛡️
                        </button>
                        <button
                          title="Eliminar usuario"
                          onClick={() => alert("Para eliminar usuarios del sistema por favor confirma con el administrador.")}
                          className="p-1 rounded text-red-400 hover:bg-slate-800 transition text-xs"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL + ADD USER */}
      {showModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0C101B] border border-amber-500/30 rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_20px_rgba(245,158,11,0.1)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">👥</span>
                Agregar Nuevo Usuario
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            {modalError && (
              <div className="mb-4 p-3 bg-red-950/50 border border-red-800/60 rounded-xl text-red-300 text-xs">
                {modalError}
              </div>
            )}

            <form onSubmit={handleAddUser} className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">Nombre Completo</label>
                <input
                  type="text"
                  placeholder="Ej: Laura Gómez"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  required
                  className="bg-[#070A12] border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-hidden focus:border-blue-500 transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  required
                  className="bg-[#070A12] border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-hidden focus:border-blue-500 transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">Contraseña Temporal</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-[#070A12] border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-hidden focus:border-blue-500 transition"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creando}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 text-xs font-black shadow-[0_0_15px_rgba(245,158,11,0.35)] hover:brightness-110 transition cursor-pointer disabled:opacity-50"
                >
                  {creando ? "Creando..." : "Crear Usuario"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
