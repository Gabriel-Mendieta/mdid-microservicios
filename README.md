
# MDID API - Prueba Técnica

### 🧩 Objetivo

Este proyecto implementa **dos microservicios**:

- `query-service`: Obtiene el perfil de un usuario  o varios usuarios(`GET`)
- `mutation-service`: Permite crear, modificar y eliminar perfiles (`POST`, `DELETE`, `PUT`, `PATCH`)

Ambos servicios se comunican de forma segura mediante un **API Gateway**

---

## 🛠️ Tecnologías utilizadas

- Lenguaje: **TypeScript**
- Framework: **NestJS**
- Base de datos: **MongoDB**
- ORM: **Prisma**
- Contenerización: **Docker**
- Orquestador: **Docker Compose** (listo para futuro uso con Kubernetes)
- Documentación: **Swagger (opcional)**
- Seguridad: JWT + Validación de llave/cliente

---

## 🔐 Seguridad - No implementada aun

- Se emite un **token JWT al crear un perfil**
- Cada petición debe enviar:
  - Header: `Authorization: Bearer <token>`
  - Header: `x-api-key: <clave_del_cliente>`

---

## 📌 Endpoints disponibles

| Microservicio    | Método | Ruta                 | Descripción                          | Protegido |
|------------------|--------|----------------------|--------------------------------------|-----------|
| **mutation**     | POST   | `/users`             | Crear nuevo usuario                  | ❌        |
| **mutation**     | PUT    | `/users/:id`         | Actualizar un usuario                | ❌        |
| **mutation**     | DELETE | `/users/:id`         | Eliminar perfil                      | ❌        |
| **mutation**     | PATCH  | `users/:id/activate` | Activa el usuario                    | ❌        |
| **mutation**     | PATCH  | `users/:id/deactivate`| Desactiva el usuario                | ❌        |
| **query**        | GET    | `/users`             | Obtener todos los usuarios           | ❌        |
| **query**        | GET    | `/users/:id`         | Obtener el ususario por id           | ❌        |
| **auth-service** | POST   | `/auth/register`     | Registro y generación de token       | ❌        |
| **auth-service** | POST   | `/auth/login`        | Autenticación                        | ❌        |

---

## 📦 Estructura del Proyecto

```
mdid-backend/
├── auth-service/
├── gateway/
├── mutation-service/
├── query-service/
├── docker-compose.yml
```

---

## ⚙️ Variables de entorno (`gateway/.env`)

```env
JWT_SECRET=claveDePrueba
AUTH_SERVICE_URL=http://auth-service:3000
MUTATION_SERVICE_URL=http://mutation-service:3000
QUERY_SERVICE_URL=http://query-service:3000
```

---

## 🧪 Cómo probar el sistema

1. Clona el repositorio
2. Ejecuta:

```bash
docker-compose up --build
```

3. Usa Postman o cURL para probar:

#### 🔸 Registro - No implementada

```
POST /auth/register
{
  "email": "user@example.com",
  "password": "123456"
}
```

#### 🔸 Login - No implementada

```
POST /auth/login
{
  "email": "user@example.com",
  "password": "123456"
}
```

🔹 Respuesta: `{ user, token }`

#### 🔸 Crear perfil (con token y apiKey)

```
POST /create-profile
Headers:
  Authorization: Bearer <token>
  x-api-key: cliente123

Body:
{
  "name": "Juan",
  "lastname": "Pérez",
  "email": "juan@example.com",
  "cellphone": "8090000000",
  "address": "Sto Dgo"
}
```

---

## 🧰 Validaciones - No implementada

- El token debe ser válido y no estar expirado
- La llave enviada (`x-api-key`) debe coincidir con la registrada
- Toda comunicación es vía REST, en formato JSON
- Se exige HTTPS/TLS 1.2+ (para producción)

---

## 📄 Notas técnicas

- Los DTOs garantizan la validación de entradas
- Prisma está configurado con MongoDB y replica set

---

## 🧠 Reglas de negocio

- BR1: JSON vía REST
- BR2: HTTPS / TLS 1.2+
- BR3: Servicios expuestos por endpoints únicos


