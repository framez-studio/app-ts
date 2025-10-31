# FramezStudio

> Digital laboratory to design, model and analyze reinforced concrete frames directly in the browser.

**[🇪🇸 Español](#versión-en-español) | [🇬🇧 English](#english-version)**

---

## Table of Contents
- [Introduction](#introduction)
- [Key Features](#key-features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Architecture and Flow](#architecture-and-flow)
- [Testing and Quality](#testing-and-quality)
- [Screenshots](#screenshots)
- [Contact](#contact)

## Introduction
FramezStudio is a web application built for structural engineering students and professionals. It allows you to sketch 2D frames, adjust material and reinforcement properties, apply loads, and run static and pushover analysis without leaving the browser. The interactive canvas, dynamic forms, and background calculations make it easy to iterate over design alternatives in minutes.

## Key Features
- **Visual modeling**: real-time canvas with gestures to navigate, select nodes and elements, and view the structure's state.
- **Contextual editing**: specific forms for nodes, elements, and pushover analysis, organized by sections (properties, loads, response, dynamics, steel).
- **Parametric generator**: builds complete frames from levels and spans, including concrete sections, steel layout, and distributed loads.
- **Advanced analysis**: static and pushover resolution executed in dedicated Web Workers to keep the interface fluid.
- **Capacity curves**: interactive charts (Recharts) to review force-displacement evolution and explore individual steps.
- **Model exchange**: export and import `.framez` files to continue configuration or share case studies.
- **PWA ready**: manifest, icons, and Sass styles ready to take the app to an installable environment.

## Demo
- **Production**: (add your Firebase Hosting URL here when available)
- **Short video / GIF**: (link to a demo or attach a GIF in this section)

## Tech Stack
- React 18 + TypeScript
- Vite 4 as bundler and development server
- Modular Sass and design tokens (Emotion + MUI for specific components)
- Math.js and custom utilities for matrix algebra and structural resolution
- Recharts for curve visualization
- Vitest for unit testing
- Firebase Hosting for deployments
- Native Web Workers to isolate intensive calculations

## Getting Started
1. Clone the repository and navigate to the project directory.
2. Install dependencies with `npm install`.
3. Start development mode with `npm run dev` (Vite exposes the app at `http://localhost:5173`).
4. Build for production with `npm run build` and preview with `npm run preview`.
5. Deploy to Firebase (after configuring credentials) using `npm run deploy`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot reload. |
| `npm run build` | Runs `tsc` and generates the optimized build in `dist/`. |
| `npm run preview` | Serves the production build for local testing. |
| `npm run test` | Runs the Vitest suite in interactive mode. |
| `npm run coverage` | Runs tests collecting coverage report. |
| `npm run check-circulars` | Analyzes the import tree with Madge to detect cycles. |
| `npm run prettier-format` | Applies consistent formatting to TypeScript files. |
| `npm run deploy` | Builds and deploys the app to Firebase Hosting. |

## Project Structure

```
src/
├─ assets/      # Icons, logos and design tokens
├─ components/  # Modular UI: sliders, forms, plotters and canvas
├─ config/      # Initial configuration of structure and global styles
├─ context/     # React contexts that share state (app, generator, pushover)
├─ hooks/       # Custom hooks for canvas, workers, loaders and state
├─ entities/    # Classes and interfaces of the structural domain
├─ utils/       # Algebra, generators, file and canvas helpers
├─ workers/     # Web Workers for static and pushover analysis
└─ tests/       # Unit and integration tests with Vitest
```

## Architecture and Flow
- Global state is concentrated in `AppContext` and `PushoverContext`, fed by `useInitial*` hooks that consolidate UI, selection, and structure data.
- The canvas (`AppCanvas`) delegates gestures to `useCanvasGestures` and rendering to `useGraphicStructure`, ensuring clean strokes through a simple `clear → gestures → draw` cycle.
- Slider forms depend on the active context to display the appropriate view: nodes, elements, or pushover analysis.
- Structural logic lives in `entities/` and `utils/`: classes for nodes, elements, materials, sections, and solvers; plus mathematical utilities supported by Math.js.
- `useStructureAPI` coordinates communication with Web Workers (`StaticSolver` and `PushoverSolver`), keeping the UI responsive when executing heavy calculations.

## Testing and Quality
- `npm run test` runs over 20 tests that validate stiffness matrices, element assemblies, load solving, and pushover scenarios.
- `npm run coverage` generates coverage reports to ensure critical logic remains covered as the project evolves.
- `npm run check-circulars` helps maintain a clean architecture by avoiding circular dependencies in TypeScript modules.


---

# Versión en Español

**[🇪🇸 Español](#versión-en-español) | [🇬🇧 English](#english-version)**

> Laboratorio digital para idear, modelar y analizar pórticos de concreto reforzado directamente en el navegador.

## Tabla de contenidos
- [Introduccion](#introduccion)
- [Caracteristicas clave](#caracteristicas-clave)
- [Demo](#demo-1)
- [Stack tecnologico](#stack-tecnologico)
- [Primeros pasos](#primeros-pasos)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto-1)
- [Arquitectura y flujo](#arquitectura-y-flujo)
- [Pruebas y calidad](#pruebas-y-calidad)
- [Capturas](#capturas)
- [Contacto](#contacto-1)

## Introduccion
FramezStudio es una aplicacion web creada para estudiantes y profesionales de ingenieria estructural. Permite bosquejar pórticos 2D, ajustar propiedades de materiales y refuerzo, aplicar cargas y ejecutar analisis estaticos y pushover sin abandonar el navegador. El lienzo interactivo, los formularios dinamicos y los calculos en segundo plano facilitan iterar sobre alternativas de diseno en cuestion de minutos.

## Caracteristicas clave
- **Modelado visual**: canvas de tiempo real con gestos para navegar, seleccionar nodos y elementos y ver el estado de la estructura.
- **Edicion contextual**: formularios especificos para nodos, elementos y analisis pushover, organizados por secciones (propiedades, cargas, respuesta, dinamica, acero).
- **Generador parametrico**: construye marcos completos a partir de niveles y vanos, incluyendo secciones de concreto, disposicion de acero y cargas distribuidas.
- **Analisis avanzado**: resolucion estatica y pushover ejecutados en Web Workers dedicados para mantener la interfaz fluida.
- **Curvas de capacidad**: graficas interactivas (Recharts) para revisar la evolucion fuerza-desplazamiento y explorar pasos individuales.
- **Intercambio de modelos**: exporta e importa archivos `.framez` para continuar la configuracion o compartir casos de estudio.
- **Preparado para PWA**: manifiesto, iconos y estilos Sass listos para llevar la app a un entorno instalable.

## Demo
- **Produccion**: (agrega aqui la URL de Firebase Hosting cuando la tengas)
- **Video corto / GIF**: (enlaza una demostracion o adjunta un GIF en este apartado)

## Stack tecnologico
- React 18 + TypeScript
- Vite 4 como bundler y servidor de desarrollo
- Sass modular y design tokens (Emotion + MUI para componentes puntuales)
- Math.js y utilidades propias para algebra matricial y resolucion estructural
- Recharts para visualizacion de curvas
- Vitest para pruebas unitarias
- Firebase Hosting para despliegues
- Web Workers nativos para aislar calculos intensivos

## Primeros pasos
1. Clona el repositorio y entra al directorio del proyecto.
2. Instala dependencias con `npm install`.
3. Levanta el modo desarrollo con `npm run dev` (Vite expone la app en `http://localhost:5173`).
4. Compila para produccion con `npm run build` y previsualiza con `npm run preview`.
5. Despliega a Firebase (previa configuracion de credenciales) mediante `npm run deploy`.

## Scripts disponibles

| Comando | Descripcion |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo de Vite con hot reload. |
| `npm run build` | Lanza `tsc` y genera la build optimizada en `dist/`. |
| `npm run preview` | Sirve la build de produccion para pruebas locales. |
| `npm run test` | Ejecuta la suite de Vitest en modo interactivo. |
| `npm run coverage` | Corre las pruebas recopilando reporte de coverage. |
| `npm run check-circulars` | Analiza el arbol de imports con Madge para detectar ciclos. |
| `npm run prettier-format` | Aplica formato consistente a los archivos TypeScript. |
| `npm run deploy` | Construye y despliega la app a Firebase Hosting. |

## Estructura del proyecto

```
src/
├─ assets/      # Iconos, logotipos y design tokens
├─ components/  # UI modular: sliders, formularios, plotters y canvas
├─ config/      # Configuracion inicial de la estructura y estilos globales
├─ context/     # Contextos React que comparten estado (app, generador, pushover)
├─ hooks/       # Hooks personalizados para canvas, workers, loaders y estado
├─ entities/    # Clases e interfaces del dominio estructural
├─ utils/       # Algebra, generadores, helpers de archivos y canvas
├─ workers/     # Web Workers para analisis estatico y pushover
└─ tests/       # Pruebas unitarias y de integracion con Vitest
```

## Arquitectura y flujo
- El estado global se concentra en `AppContext` y `PushoverContext`, alimentados por hooks `useInitial*` que consolidan UI, seleccion y datos de la estructura.
- El lienzo (`AppCanvas`) delega gestos a `useCanvasGestures` y renderizado a `useGraphicStructure`, garantizando trazos limpios mediante un simple ciclo `clear → gestures → draw`.
- Los formularios slider dependen del contexto activo para mostrar la vista adecuada: nodos, elementos o analisis pushover.
- La logica estructural vive en `entities/` y `utils/`: clases para nodos, elementos, materiales, secciones y solucionadores; mas utilidades matematicas apoyadas en Math.js.
- `useStructureAPI` coordina la comunicacion con los Web Workers (`StaticSolver` y `PushoverSolver`), manteniendo el UI responsivo al ejecutar calculos pesados.

## Pruebas y calidad
- `npm run test` ejecuta mas de 20 pruebas que validan matrices de rigidez, ensamblajes de elementos, solvencia de cargas y escenarios de pushover.
- `npm run coverage` genera reportes de cobertura para asegurar que la logica critica siga cubierta a medida que evoluciona el proyecto.
- `npm run check-circulars` ayuda a mantener una arquitectura limpia evitando dependencias circulares en los modulos TypeScript.
