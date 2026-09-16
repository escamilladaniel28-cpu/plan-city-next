export interface Usuario {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  createdAt: string
}
