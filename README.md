# Monorepo Template

Template para Monorepos gestionado con Turbopack que usa em front Vite+React+TS y back NestJS.

Este template está diseñado inicialmente para facilitar el prototipado rápido y la validación de ideas. La arquitectura monorepo ofrece varias ventajas estratégicas:

1. **Desarrollo Inicial Ágil**:

   - Facilita el despliegue rápido como un monolito
   - Simplifica la gestión de dependencias y configuración
   - Permite iteraciones rápidas en etapas tempranas

2. **Escalabilidad Planificada**:

   - La estructura está pensada para facilitar la separación futura
   - Los proyectos están organizados como aplicaciones independientes
   - El acoplamiento mínimo permite separar frontend y backend cuando sea necesario

3. **Evolución Natural**:
   - Comienza como un monolito para validar ideas rápidamente
   - Escala a microservicios cuando el proyecto lo requiera
   - Mantiene la base de código organizada para facilitar la transición

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

## Gestión de Dependencias

Para agregar nuevas dependencias a aplicaciones específicas dentro del monorepo, utiliza el flag `--workspace`:

```bash
# Instalar una dependencia solo en la aplicación cliente
npm install react-query --workspace client

# Instalar una dependencia solo en el servidor
npm install @nestjs/jwt --workspace server

# Instalar una dependencia de desarrollo
npm install -D @types/react --workspace client
```

Este enfoque asegura que las dependencias se instalen en el `package.json` correcto dentro de la estructura del monorepo.

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
