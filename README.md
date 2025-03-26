# Monorepo Template

Este proyecto es un monorepo gestionado con Turbopack que contiene una aplicación frontend construida con Vite+React+TS y un backend con NestJS.

## Estructura del Proyecto

```
.
├── apps/
│   ├── client/     # Aplicación frontend (Vite)
│   └── server/     # Aplicación backend (NestJS)
├── package.json    # Dependencias globales y scripts
└── turbo.json     # Configuración de Turborepo
```

## Requisitos Previos

- Node.js (v18 o superior)
- npm >= 10.9.2

## Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd monorepo_nestjs
```

2. Instalar dependencias globales:

```bash
npm install
```

## Desarrollo

Para ejecutar el proyecto en modo desarrollo:

```bash
npm dev
```

Este comando iniciará:

- Frontend (Vite) en `http://localhost:5173`
- Backend (NestJS) en `http://localhost:3000`

El frontend está configurado con un proxy que redirige todas las peticiones `/api` al backend.

### Scripts Disponibles

- `npm dev`: Inicia todos los servicios en modo desarrollo
- `npm build`: Construye todas las aplicaciones
- `npm start`: Inicia las aplicaciones en modo producción

---

## Flujo de Trabajo

### Desarrollo Local

1. El frontend (Vite) se ejecuta en modo desarrollo y utiliza un proxy para redirigir las peticiones API al backend
2. El backend (NestJS) procesa las peticiones API y sirve la aplicación en producción
3. Turbopack gestiona:
   - Caché de compilación
   - Dependencias compartidas
   - Construcción optimizada

### Producción

En producción:

1. NestJS sirve los archivos estáticos generados por Vite
2. Todas las peticiones API son manejadas directamente por NestJS
3. La aplicación completa se sirve desde un único servidor

## Configuración

### Proxy en Desarrollo

El archivo `vite.config.ts` está configurado con:

```typescript
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
```

### Servir Archivos Estáticos en NestJS

NestJS está configurado para servir los archivos estáticos de la build de Vite en producción:

```typescript
app.useStaticAssets(join(__dirname, "../client/dist"));
```

## Cache y Optimización

Turbopack proporciona:

- Caché persistente entre builds
- Construcción incremental
- Reutilización de dependencias
- Optimización de compilación
