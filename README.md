# Mini Core Logística MVC

Aplicación web desarrollada para resolver un problema de logística: calcular el costo total de envíos realizados por cada repartidor dentro de un rango de fechas, aplicando la tarifa por kilogramo definida según la zona de entrega.

El proyecto implementa el patrón arquitectónico MVC utilizando un backend desarrollado con Node.js + Express.js y un frontend desarrollado con Vue 3.

---

# Tecnologías utilizadas

## Backend

- Node.js
- Express.js
- Supabase
- PostgreSQL


## Frontend

- Vue.js 3
- Vite
- Vue Router
- Tailwind CSS


## Infraestructura

- Supabase Cloud (Base de datos)
- Render (Backend)
- Netlify (Frontend)

---

# Arquitectura MVC

El proyecto implementa una separación de responsabilidades basada en el patrón MVC:

```
Usuario

   ↓

Vue (View)

   ↓

Express Routes

   ↓

Controller

   ↓

Service

   ↓

Models

   ↓

Supabase PostgreSQL
```

## Model

Representa la capa encargada del acceso a datos.

Responsabilidades:

- Consultar información de repartidores.
- Consultar envíos registrados.
- Obtener zonas y tarifas.
- Comunicarse con PostgreSQL mediante Supabase.


## Controller

Gestiona las solicitudes provenientes del frontend.

Responsabilidades:

- Recibir el rango de fechas.
- Coordinar la ejecución de la lógica.
- Retornar la respuesta al cliente.


## Service

Contiene la lógica principal del negocio.

Responsabilidades:

- Filtrar envíos por fecha.
- Aplicar la fórmula de cálculo.
- Agrupar resultados por repartidor.

Fórmula aplicada:

```
Costo envío = peso_kg × tarifa_por_kg
```


## View

Representa la interfaz desarrollada con Vue.

Responsabilidades:

- Capturar fechas ingresadas por el usuario.
- Consumir la API.
- Mostrar detalle de envíos.
- Mostrar resumen por repartidor.

---

# Estructura del proyecto

```
mini-core-logistica
├─ backend
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ server.js
│  └─ src
│     ├─ app.js
│     ├─ config
│     │  └─ supabase.js
│     ├─ controllers
│     │  └─ envioController.js
│     ├─ models
│     │  ├─ envioModel.js
│     │  ├─ repartidorModel.js
│     │  └─ zonaModel.js
│     ├─ routes
│     │  └─ envioRoutes.js
│     └─ services
│        └─ calculoCostoService.js
│
├─ frontend
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ src
│  │  ├─ App.vue
│  │  ├─ components
│  │  │  ├─ TablaDetalle.vue
│  │  │  └─ TablaResumen.vue
│  │  ├─ main.js
│  │  ├─ router
│  │  │  └─ index.js
│  │  ├─ services
│  │  │  └─ envioService.js
│  │  ├─ style.css
│  │  └─ views
│  │     └─ ReporteEnvios.vue
│  └─ vite.config.js
│
├─ imgs
│  ├─ Repartidor.png
│  ├─ CostoEnvio.png
│  └─ BDD.png
│
└─ README.md
```

---

# Funcionamiento del sistema

El usuario ingresa:

- Fecha inicio.
- Fecha fin.


El sistema realiza:

1. Consulta los envíos realizados dentro del rango seleccionado.
2. Obtiene la zona asociada a cada envío.
3. Obtiene la tarifa por kilogramo correspondiente.
4. Calcula el costo individual:

```
Costo envío = peso_kg × tarifa_por_kg
```

5. Agrupa los resultados por repartidor.
6. Muestra el detalle de cada envío y el resumen final.

---

# Modelo de datos

El sistema utiliza tres entidades principales:

- Repartidor
- Zonas
- Envíos


## 🚚 Tabla `repartidor`

Contiene la información de los repartidores registrados.

| Campo | Tipo | Descripción |
|---|---|---|
| `id_repartidor` | INT (PK) | Identificador único del repartidor |
| `nombre` | VARCHAR | Nombre completo del repartidor |
| `email` | VARCHAR | Correo de contacto |


---

## 📍 Tabla `zonas`

Contiene las zonas de entrega y sus tarifas.

| Campo | Tipo | Descripción |
|---|---|---|
| `id_zona` | INT (PK) | Identificador único de la zona |
| `nombre_zona` | VARCHAR | Nombre de la zona |
| `tarifa_por_kg` | DECIMAL | Costo por kilogramo enviado |


---

## 📦 Tabla `envios`

Registra cada envío realizado.

| Campo | Tipo | Descripción |
|---|---|---|
| `id_envio` | INT (PK) | Identificador del envío |
| `id_repartidor` | INT (FK) | Repartidor asignado |
| `id_zona` | INT (FK) | Zona de entrega |
| `peso_kg` | DECIMAL | Peso del paquete |
| `fecha_envio` | DATE | Fecha del envío |

---

# Relaciones entre tablas

```
repartidor

    1

    |

    |

    N

envios

    N

    |

    |

    1

zonas
```

Un repartidor puede tener múltiples envíos.

Cada envío pertenece a una zona específica.

La zona define la tarifa utilizada para calcular el costo.

---

# Base de datos PostgreSQL - Supabase

## Tabla `repartidor`

| Columna | Tipo | Restricciones |
|---|---|---|
| `id_repartidor` | `int4` | Primary Key |
| `nombre` | `varchar` | Not Null |
| `email` | `varchar` | Nullable |


## Tabla `zonas`

| Columna | Tipo | Restricciones |
|---|---|---|
| `id_zona` | `int4` | Primary Key |
| `nombre_zona` | `varchar` | Not Null |
| `tarifa_por_kg` | `numeric` | Not Null |


## Tabla `envios`

| Columna | Tipo | Restricciones |
|---|---|---|
| `id_envio` | `int4` | Primary Key |
| `id_repartidor` | `int4` | Foreign Key |
| `id_zona` | `int4` | Foreign Key |
| `peso_kg` | `numeric` | Not Null |
| `fecha_envio` | `date` | Not Null |

---

# Supabase
![BDD](imgs/BDD.png)

---

# Ejemplo de cálculo

Envío:

- Peso: 10 kg
- Zona: Norte
- Tarifa: $1.50/kg


Resultado:

```
10 × 1.50 = $15.00
```

---

# Instalación local

## Clonar repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

---

# Backend

Ingresar:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear archivo:

```
.env
```

Agregar:

```env
SUPABASE_URL=
SUPABASE_KEY=
```

Ejecutar:

```bash
npm run dev
```

Backend:

```
http://localhost:3000
```

---

# Frontend

Ingresar:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Crear archivo:

```
.env
```

Agregar:

```env
VITE_API_URL=
```

Ejecutar:

```bash
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# Endpoint principal

## Reporte de envíos por rango de fechas

Método:

```
GET
```

Endpoint:

```
/api/envios/reporte
```

Parámetros:

```
fechaInicio
fechaFin
```


Ejemplo:

```
/api/envios/reporte?fechaInicio=2025-05-01&fechaFin=2025-05-31
```

---

# Deploy

## Frontend

Netlify:

https://6a38b2d7362133b7ea93fe9b--mini-core-logistica-frontend.netlify.app/


## Backend

Render:

https://mini-core-logistica-backend.onrender.com


## Base de datos

Supabase:

https://kchaeirkgdecdonwzvpn.supabase.co

---

# Video explicativo

Video de funcionamiento y explicación del patrón MVC:

- Pendiente de agregar

---

# Documentación utilizada

## Express.js

https://expressjs.com/


## Vue.js

https://vuejs.org/


## Supabase

https://supabase.com/docs


---

# Autor

**Rodrigo Andrade**

Correo institucional:

rodrigo.andrade@udla.edu.ec