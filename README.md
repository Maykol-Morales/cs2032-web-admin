# cs2032-web-admin

> Proyecto del curso **CS2032 – Cloud Computing** · UTEC

**Panel de administración** para los instructores del curso. Permite crear sesiones de clase, ver la tabla de sesiones y generar el código QR que los alumnos escanean para marcar asistencia en [cs2032-web-attendance](https://github.com/Maykol-Morales/cs2032-web-attendance).

🌐 **En producción:** https://admin.cs2032.com

## Funcionalidades

- Login con Google (solo instructores registrados)
- Tabla de sesiones del curso
- Creación de sesiones (`POST /session`)
- Código QR de cada sesión (generado por el backend) que abre la web de asistencia

## Stack

- Astro 5 · React 19 · TypeScript
- Tailwind CSS 4 · shadcn/ui (Radix) · Sonner
- Google OAuth (`@react-oauth/google`)
- pnpm
- Despliegue estático en AWS S3 + CloudFront

## Configuración

Crea un archivo `.env` (está en `.gitignore`):

| Variable | Descripción |
|---|---|
| `PUBLIC_BACK_END_URL` | URL base de la API de asistencia |
| `PUBLIC_BACK_END_KEY` | API key enviada en el header `x-api-key` |
| `PUBLIC_GOOGLE_CLIENT_ID` | Client ID de Google OAuth |

## Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # genera dist/
pnpm preview
```

## Estructura

```
src/
├── components/
│   ├── google-auth.tsx   # Login con Google
│   ├── dialog/           # Crear sesión, QR de la sesión
│   ├── table/            # Tabla de sesiones
│   ├── views/            # Vista de administración y pre-login
│   └── ui/               # Componentes shadcn/ui
├── hooks/                # use-instructor, use-session-create, use-sessions-fetch, use-google-auth
├── layouts/
└── pages/index.astro
```

## Repositorios relacionados

- [cs2032-web-attendance](https://github.com/Maykol-Morales/cs2032-web-attendance) — web de asistencia para alumnos
- [cs2032-web-hackathon](https://github.com/Maykol-Morales/cs2032-web-hackathon) — web del hackathon HACK//UTEC
