# Arquitectura del Proyecto — PlanCity Next

## Objetivo
Este documento explica la estructura de carpetas del proyecto y las decisiones detrás de ella, tomando como base el proyecto anterior PlanCity (React + TypeScript + Vite), ahora migrado a Next.js con App Router.

## Estructura de carpetas

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (protected)/
│   │   └── favoritos/page.tsx
│   ├── admin/page.tsx
│   ├── api/
│   │   └── eventos/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
├── hooks/
├── services/
├── types/
├── context/
├── lib/
└── middleware.ts
```

## Qué va en cada carpeta

- **`app/`**: solo rutas y layouts. Cada carpeta con `page.tsx` es una URL real. Las carpetas entre paréntesis, como `(auth)` y `(protected)`, agrupan rutas relacionadas sin afectar la URL final.
- **`components/`**: piezas de UI reutilizables en varias páginas (botones, cards, formularios).
- **`hooks/`**: lógica reutilizable con estado o efectos, migrada de PlanCity (ej. `useFetch`, `useAuth`).
- **`services/`**: funciones que hablan con la API o el backend. Ningún componente debe hacer `fetch` directamente; siempre pasa por aquí.
- **`types/`**: interfaces como `Event`, `Category`, `User`, centralizadas para todo el proyecto.
- **`context/`**: contextos globales de React, como `AuthContext`, migrado tal cual desde PlanCity.
- **`lib/`**: funciones puras de utilidad (formatear fechas, validar formularios, etc.) sin lógica de negocio específica.
- **`middleware.ts`**: revisa si hay sesión activa antes de dejar entrar a rutas bajo `(protected)`.

## Por qué esta organización

- **Separación por responsabilidad**: cada carpeta tiene un único propósito, así cualquier compañero sabe dónde buscar sin adivinar.
- **Route Groups**: permiten organizar rutas públicas y privadas sin ensuciar la URL, y facilitan aplicar el middleware solo donde corresponde.
- **Máximo 3-4 niveles de anidación**: se evita crear carpetas dentro de carpetas sin necesidad, para que el proyecto siga siendo fácil de navegar.
- **Carpetas vacías con `.gitkeep`**: Git no rastrea carpetas vacías, así que se agregó un `.gitkeep` en cada una de las carpetas base para que viajen correctamente al clonar el repositorio en otra máquina.

## Diferencias vs el proyecto anterior (PlanCity con React + Vite)

| Aspecto | PlanCity (React + Vite) | PlanCity Next |
|---|---|---|
| Definición de rutas | Código, con React Router (`<Route path>`) | Carpetas dentro de `app/`, con `page.tsx` |
| Dónde corre el código | Todo en el navegador (CSR) | Servidor por defecto (Server Components), cliente solo donde se indique (`'use client'`) |
| Backend/API | Externo, consumido con `fetch` desde el cliente | Puede vivir dentro del mismo proyecto, en `app/api/` |
| Protección de rutas privadas | Lógica dentro de componentes (ej. `PrivateRoute`) | `middleware.ts`, se ejecuta antes de llegar a la página |
| Carpeta de entrada | `src/App.tsx` con todas las rutas centralizadas | No existe un archivo central; cada ruta vive en su propia carpeta |

## Cómo agregar una nueva feature

1. Si necesita una nueva ruta visitable, crea una carpeta en `app/` (o dentro de `(auth)`/`(protected)` si aplica) con su `page.tsx`.
2. Si necesita traer datos de una API, agrega la función en `services/`.
3. Si el tipo de dato es nuevo (ej. `Comentario`), agrégalo en `types/`.
4. Si hay lógica reutilizable con estado, créala como hook en `hooks/`.
5. Si el componente necesita interactividad del usuario (clicks, formularios), agrégale `'use client'` arriba del archivo.
6. Si la ruta debe ser privada, muévela dentro de `(protected)` y agrega su path al `matcher` de `middleware.ts`.
