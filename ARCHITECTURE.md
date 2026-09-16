# Arquitectura del Proyecto — PlanCity Next

## Objetivo
Este documento explica la estructura de carpetas del proyecto y las decisiones detrás de ella, tomando como base el proyecto anterior PlanCity (React + TypeScript + Vite), ahora migrado a Next.js con App Router.

## Estructura de carpetas

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx          # Formulario de login (simulado)
│   │   └── register/page.tsx
│   ├── (protected)/
│   │   └── favoritos/page.tsx      # Ruta protegida por middleware
│   ├── admin/page.tsx              # Panel de administración
│   ├── api/
│   │   ├── categorias/route.ts     # Endpoint GET de categorías
│   │   ├── eventos/route.ts        # Endpoint GET de eventos
│   │   └── login/route.ts          # Endpoint POST que crea la cookie de sesión
│   ├── categorias/page.tsx         # Ruta /categorias (con aside de Eventos)
│   ├── eventos/page.tsx            # Ruta /eventos (con aside de Categorías)
│   ├── layout.tsx                  # Layout raíz: Header + Footer + fuentes + metadata
│   ├── page.tsx                    # Landing de bienvenida, con botones a /categorias y /eventos
│   └── globals.css
├── components/
│   ├── Header.tsx                  # Navegación (next/link) a Inicio, Categorías, Eventos
│   ├── Footer.tsx                  # Pie de página
│   ├── ListaCategorias.tsx         # Lista de categorías con imagen
│   └── ListaEventos.tsx            # Lista de eventos con imagen
├── hooks/
│   ├── useCategorias.ts            # Trae categorías vía services/
│   └── useEventos.ts               # Trae eventos vía services/
├── services/
│   ├── categorias.service.ts       # fetch hacia /api/categorias
│   └── eventos.service.ts          # fetch hacia /api/eventos
├── types/
│   ├── categoria.ts                # interface Categoria { id, nombre, imagen }
│   └── evento.ts                   # interface Evento { id, nombre, imagen }
├── context/                        # (pendiente: AuthContext si se requiere)
├── lib/                            # (pendiente: utilidades generales)
└── middleware.ts                   # Protege /favoritos revisando la cookie "session"
```

## Qué va en cada carpeta

- **`app/`**: solo rutas y layouts. Cada carpeta con `page.tsx` es una URL real; cada carpeta con `route.ts` es un endpoint. Nunca conviven los dos en la misma carpeta (Next.js lo rechaza con un build error).
- **`components/`**: piezas de UI reutilizables. Un componente por archivo, sin mezclar dos componentes en el mismo lugar.
- **`hooks/`**: lógica reutilizable con estado o efectos (`useCategorias`, `useEventos`). Siempre llevan `'use client'` porque usan `useState`/`useEffect`.
- **`services/`**: única capa que sabe la URL real del endpoint (`/api/categorias`, `/api/eventos`). Ningún componente hace `fetch` directamente.
- **`types/`**: interfaces compartidas (`Categoria`, `Evento`), ahora con el campo `imagen` agregado.
- **`context/`** y **`lib/`**: reservadas para cuando el proyecto lo requiera (por ejemplo, un `AuthContext` si el login deja de ser simulado).
- **`middleware.ts`**: revisa la cookie `session` antes de dejar entrar a `/favoritos`. Si no existe, redirige a `/login`.

## Flujo de datos (patrón repetido para Categorías y Eventos)

```
route.ts (api/)  →  services/  →  hooks/  →  components/  →  page.tsx
```

`route.ts` entrega los datos (hoy quemados, mañana desde una base de datos real, sin tocar el resto de la cadena). `page.tsx` arma lo que el usuario ve, usando el componente correspondiente.

## Autenticación (simulada, pendiente de backend real)

1. El usuario llena el formulario en `(auth)/login/page.tsx` (Client Component, usa `useState` y `onSubmit`).
2. Se envía un `POST` a `api/login/route.ts`, que valida contra credenciales quemadas (`admin` / `1234`).
3. Si son correctas, se crea la cookie `session` con el rol del usuario (ej. `"admin"`).
4. `middleware.ts` revisa esa cookie en cada intento de entrar a `/favoritos`.
5. Dentro de `favoritos/page.tsx` (Server Component `async`, usando `cookies()` de `next/headers`), se lee el rol y se muestra condicionalmente un botón a `/admin` solo si `rol === "admin"`.

**Pendiente:** reemplazar la validación quemada del paso 2 por una consulta real a base de datos cuando exista backend. El resto del flujo (cookie, middleware, botón condicional) no debería necesitar cambios.

## Rutas actuales

| Ruta | Contenido | Protegida |
|---|---|---|
| `/` | Landing de bienvenida con botones a Categorías y Eventos | No |
| `/categorias` | Lista de categorías (contenido principal centrado) + aside de Eventos a la izquierda | No |
| `/eventos` | Lista de eventos (contenido principal centrado) + aside de Categorías a la derecha | No |
| `/login` | Formulario de login simulado | No |
| `/register` | Placeholder | No |
| `/favoritos` | Contenido protegido + botón a `/admin` si el rol es admin | Sí (middleware) |
| `/admin` | Panel de administración (placeholder) | No (pendiente proteger con middleware) |
| `/api/categorias`, `/api/eventos` | Endpoints GET con datos quemados | No aplica |
| `/api/login` | Endpoint POST que valida credenciales y crea la cookie | No aplica |

## Por qué esta organización

- **Separación por responsabilidad**: cada carpeta tiene un único propósito, así cualquier compañero sabe dónde buscar sin adivinar.
- **Route Groups `(auth)` y `(protected)`**: agrupan rutas relacionadas sin afectar la URL, y facilitan ver de un vistazo cuáles rutas son públicas y cuáles deberían estar protegidas (aunque la protección real la hace el middleware, no el paréntesis en sí).
- **Máximo 3-4 niveles de anidación**: se evita crear carpetas dentro de carpetas sin necesidad.
- **Carpetas vacías con `.gitkeep`**: Git no rastrea carpetas vacías (`context/`, `lib/`), así que llevan un `.gitkeep` para viajar correctamente al clonar el repo en otra máquina.

## Diferencias vs el proyecto anterior (PlanCity con React + Vite)

| Aspecto | PlanCity (React + Vite) | PlanCity Next |
|---|---|---|
| Definición de rutas | Código, con React Router (`<Route path>`) | Carpetas dentro de `app/`, con `page.tsx` |
| Navegación entre páginas | `<Link>` de React Router | `<Link>` de `next/link` |
| Dónde corre el código | Todo en el navegador (CSR) | Servidor por defecto (Server Components), cliente solo donde se indique (`'use client'`) |
| Backend/API | Externo, consumido con `fetch` desde el cliente | Vive dentro del mismo proyecto, en `app/api/` |
| Protección de rutas privadas | Lógica dentro de componentes (ej. `PrivateRoute`) | `middleware.ts`, se ejecuta antes de llegar a la página, revisando cookies |
| Sesión del usuario | Normalmente en `localStorage` o Context | Cookie leída en el servidor con `cookies()` de `next/headers` |
| Carpeta de entrada | `src/App.tsx` con todas las rutas centralizadas | No existe un archivo central; cada ruta vive en su propia carpeta |

## Cómo agregar una nueva feature

1. Si necesita una nueva ruta visitable, crea una carpeta en `app/` (o dentro de `(auth)`/`(protected)` si aplica) con su `page.tsx`.
2. Si necesita traer datos de una API, agrega el endpoint en `app/api/<nombre>/route.ts` y la función correspondiente en `services/`.
3. Si el tipo de dato es nuevo, agrégalo en `types/`.
4. Si hay lógica reutilizable con estado, créala como hook en `hooks/` (con `'use client'`).
5. Si el componente necesita interactividad del usuario (clicks, formularios), agrégale `'use client'` arriba del archivo; si solo muestra datos, déjalo como Server Component sin nada extra.
6. Si la ruta debe ser privada, muévela dentro de `(protected)` y agrega su path al `matcher` de `middleware.ts`.
