# SENATI Store API

API REST para la gestión de una tienda en línea, desarrollada con Node.js, Express y MongoDB. Incluye funcionalidades de autenticación, autorización basada en roles, gestión de productos, categorías y usuarios.

---

## 📋 Descripción General

**SENATI Store API** es una aplicación backend que proporciona una plataforma completa para gestionar:
- **Productos**: Catálogo con filtros, búsqueda y gestión de stock
- **Categorías**: Clasificación de productos
- **Usuarios**: Autenticación, registro y control de roles

El proyecto está diseñado con arquitectura MVC (Model-View-Controller), separando la lógica en modelos, controladores y rutas, facilitando el mantenimiento y escalabilidad.

---

## ✨ Características

- ✅ **Autenticación con JWT**: Sistema seguro de tokens para acceso a endpoints protegidos
- ✅ **Autorización basada en roles**: Diferenciación entre usuarios normales y administradores
- ✅ **CRUD de Productos**: Crear, leer, actualizar y eliminar productos con validaciones
- ✅ **Filtrado y búsqueda**: Filtrar por categoría, rango de precio y búsqueda por nombre
- ✅ **Gestión de stock**: Control de disponibilidad de productos
- ✅ **Soft delete**: Los productos eliminados se marcan como inactivos sin borrar registros
- ✅ **Encriptación de contraseñas**: Uso de bcryptjs para seguridad
- ✅ **CORS habilitado**: Permite solicitudes desde diferentes orígenes
- ✅ **Validación de datos**: Esquemas de mongoose con reglas de validación
- ✅ **Timestamps automáticos**: Registro de creación y última modificación
- ✅ **Manejo centralizado de errores**: Middleware global para gestionar excepciones

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| **Node.js** | - | Runtime de JavaScript |
| **Express** | ^5.2.1 | Framework web |
| **MongoDB Atlas** | - | Base de datos NoSQL en la nube |
| **Mongoose** | ^9.6.1 | ODM para MongoDB |
| **JWT** | ^9.0.3 | Autenticación |
| **bcryptjs** | ^3.0.3 | Encriptación de contraseñas |
| **CORS** | ^2.8.6 | Control de acceso entre dominios |
| **dotenv** | ^17.4.2 | Gestión de variables de entorno |
| **Nodemon** | ^3.1.14 | Reinicio automático en desarrollo |

---

## 📦 Requisitos Previos

Antes de iniciar, asegúrate de tener instalado:

- **Node.js** (versión 14 o superior)
- **npm** o **yarn**
- **Cuenta de MongoDB Atlas** (base de datos en la nube)

Verifica la instalación con:
```bash
node --version
npm --version
```

---

## 🚀 Instalación y Configuración

### 1. Clonar o descargar el repositorio
```bash
cd senati-store-api
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
En la raíz del proyecto, copia el archivo `.env.example` como `.env` y completa con tus valores reales:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de MongoDB Atlas:

```env
# Puerto del servidor
PORT=3000

# Conexión a MongoDB Atlas
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/?appName=nombre-app

# Clave secreta para JWT
JWT_SECRET=tu_clave_secreta_muy_segura_aqui

# Entorno
NODE_ENV=development
```

**Nota**: Reemplaza `usuario`, `contraseña`, `cluster` y `nombre-app` con tus credenciales reales de MongoDB Atlas.

### 4. Configurar MongoDB Atlas

Si no tienes MongoDB Atlas configurado:

1. Ve a [MongoDB Atlas](https://www.mongodb.com/atlas) y crea una cuenta
2. Crea un nuevo cluster (elige el plan gratuito)
3. Crea un usuario de base de datos con permisos de lectura/escritura
4. Configura la lista blanca de IP (agrega `0.0.0.0/0` para acceso desde cualquier IP)
5. Obtén la cadena de conexión desde "Connect" > "Connect your application"
6. Actualiza la variable `MONGODB_URI` en tu archivo `.env`

### 5. Iniciar el servidor

**Modo desarrollo** (con reinicio automático):
```bash
npm run dev
```

**Modo producción**:
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

---

## 📁 Estructura del Proyecto

```
senati-store-api/
├── src/
│   ├── config/              # Configuraciones (en desarrollo)
│   ├── controllers/         # Lógica de negocio
│   │   ├── productController.js
│   │   ├── categoryController.js
│   │   └── userController.js
│   ├── middlewares/         # Middleware personalizado
│   │   ├── authMiddleware.js    # Autenticación y autorización
│   │   └── errorMiddleware.js   # Manejo de errores
│   ├── models/              # Esquemas de Mongoose
│   │   ├── Product.js
│   │   ├── Category.js
│   │   └── User.js
│   ├── routes/              # Definición de rutas
│   │   ├── productRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── userRoutes.js
│   └── index.js             # Punto de entrada principal
├── .env                     # Variables de entorno
├── .env.example             # Ejemplo de variables
├── package.json
├── docker-compose.yml       # Configuración Docker (en desarrollo)
├── Dockerfile               # Imagen Docker (en desarrollo)
└── README.md
```

---

## 🔗 Endpoints Disponibles

### Base URL
```
http://localhost:3000/api
```

### 1️⃣ PRODUCTOS

#### Obtener todos los productos
```
GET /products
```

**Parámetros de consulta (opcionales)**:
- `category`: ID de la categoría para filtrar
- `minPrice`: Precio mínimo
- `maxPrice`: Precio máximo
- `search`: Búsqueda por nombre (insensible a mayúsculas)

**Ejemplo**:
```bash
GET /api/products?category=507f1f77bcf86cd799439011&minPrice=50&maxPrice=500&search=laptop
```

**Respuesta**:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Laptop Dell",
      "description": "Laptop potente para trabajo",
      "price": 299.99,
      "stock": 15,
      "category": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Electrónica"
      },
      "imageUrl": "https://example.com/image.jpg",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

#### Obtener producto por ID
```
GET /products/:id
```

**Parámetro**:
- `id`: ID del producto (ObjectId de MongoDB)

**Respuesta**:
```json
{
  "success": true,
  "data": { /* Objeto producto */ }
}
```

---

#### Crear producto ⚠️ (Requiere autenticación y rol admin)
```
POST /products
Authorization: Bearer <token_jwt>
Content-Type: application/json
```

**Body**:
```json
{
  "name": "Producto Nuevo",
  "description": "Descripción del producto",
  "price": 99.99,
  "stock": 20,
  "category": "507f1f77bcf86cd799439011",
  "imageUrl": "https://ejemplo.com/imagen.jpg"
}
```

**Respuesta** (201 Created):
```json
{
  "success": true,
  "data": { /* Objeto producto creado */ }
}
```

---

#### Actualizar producto ⚠️ (Requiere autenticación y rol admin)
```
PUT /products/:id
Authorization: Bearer <token_jwt>
Content-Type: application/json
```

**Body**: Propiedades a actualizar
```json
{
  "price": 89.99,
  "stock": 25
}
```

**Respuesta**:
```json
{
  "success": true,
  "data": { /* Objeto producto actualizado */ }
}
```

---

#### Eliminar producto ⚠️ (Requiere autenticación y rol admin)
```
DELETE /products/:id
Authorization: Bearer <token_jwt>
```

**Nota**: Realiza "soft delete", marcando el producto como inactivo sin borrarlo de la base de datos.

**Respuesta**:
```json
{
  "success": true,
  "message": "Producto eliminado correctamente"
}
```

---

### 2️⃣ CATEGORÍAS (En desarrollo)

#### Obtener todas las categorías
```
GET /categories
```

Actualmente retorna:
```json
{ "message": "Ruta de categorías - en desarrollo" }
```

**Próximas funcionalidades**:
- Listar categorías
- Crear categoría
- Actualizar categoría
- Eliminar categoría

---

### 3️⃣ USUARIOS (En desarrollo)

#### Registro de usuario
```
POST /users/register
```

**Body**:
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "contraseña123"
}
```

Actualmente retorna:
```json
{ "message": "Registro de usuario - en desarrollo" }
```

---

#### Login de usuario
```
POST /users/login
```

**Body**:
```json
{
  "email": "juan@example.com",
  "password": "contraseña123"
}
```

**Respuesta esperada**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "user"
  }
}
```

Actualmente retorna:
```json
{ "message": "Login de usuario - en desarrollo" }
```

---

#### Obtener usuarios
```
GET /users
```

Actualmente retorna:
```json
{ "message": "Ruta de usuarios - en desarrollo" }
```

---

## 🔐 Autenticación

### ¿Cómo funciona?

1. **Registro**: El usuario se registra con nombre, email y contraseña
2. **Login**: El usuario inicia sesión y recibe un token JWT
3. **Token**: Se envía el token en el header `Authorization` como `Bearer <token>`
4. **Verificación**: El middleware valida el token en cada solicitud protegida

### Middleware de Autenticación

**Archivo**: [src/middlewares/authMiddleware.js](src/middlewares/authMiddleware.js)

#### `protect`: Verifica autenticación
```javascript
app.get('/ruta-protegida', protect, (req, res) => {
  // Solo accesible con token JWT válido
  // req.user contiene la información del usuario
});
```

#### `admin`: Verifica rol de administrador
```javascript
app.delete('/api/products/:id', protect, admin, deleteProduct);
// Solo administradores pueden eliminar productos
```

### Obtener un token (cuando esté implementado login)

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@senati.com","password":"contraseña123"}'
```

### Usar el token en solicitudes

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"name":"Nuevo producto",...}'
```

---

## 📊 Modelos de Datos

### 1. Usuario (User)

```javascript
{
  _id: ObjectId,
  name: String (requerido),
  email: String (requerido, único, minúsculas),
  password: String (requerido, encriptado),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date (automático),
  updatedAt: Date (automático)
}
```

**Métodos**:
- `comparePassword(candidatePassword)`: Compara contraseña ingresada con la almacenada

**Middleware**:
- Antes de guardar: Encripta la contraseña con bcrypt

---

### 2. Producto (Product)

```javascript
{
  _id: ObjectId,
  name: String (requerido, sin espacios en blanco),
  description: String (requerido),
  price: Number (requerido, mínimo 0),
  stock: Number (requerido, mínimo 0, default: 0),
  category: ObjectId (referencia a Category, requerido),
  imageUrl: String (default: placeholder),
  isActive: Boolean (default: true),
  createdAt: Date (automático),
  updatedAt: Date (automático)
}
```

**Relaciones**:
- `category`: Referencia a modelo Category (populate disponible)

---

### 3. Categoría (Category)

```javascript
{
  _id: ObjectId,
  name: String (requerido, único, sin espacios en blanco),
  description: String,
  icon: String,
  createdAt: Date (automático),
  updatedAt: Date (automático)
}
```

---

## ⚠️ Códigos de Error HTTP

| Código | Significado | Caso de uso |
|--------|------------|-----------|
| **200** | OK | Solicitud exitosa |
| **201** | Created | Recurso creado exitosamente |
| **400** | Bad Request | Datos inválidos o mal formados |
| **401** | Unauthorized | Token ausente o inválido |
| **403** | Forbidden | Permisos insuficientes (no es admin) |
| **404** | Not Found | Recurso no encontrado |
| **500** | Internal Server Error | Error del servidor |

**Respuesta de error**:
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

---

## 🧪 Ejemplo de Uso Completo

### 1. Obtener productos (Público)
```bash
curl http://localhost:3000/api/products
```

### 2. Buscar productos con filtros
```bash
curl "http://localhost:3000/api/products?minPrice=100&maxPrice=500&search=laptop"
```

### 3. Crear un producto (requiere autenticación de admin)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer <tu_token_jwt>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Monitor LG 27 pulgadas",
    "description": "Monitor 4K con DisplayPort",
    "price": 349.99,
    "stock": 10,
    "category": "507f1f77bcf86cd799439011",
    "imageUrl": "https://ejemplo.com/monitor.jpg"
  }'
```

### 4. Actualizar un producto
```bash
curl -X PUT http://localhost:3000/api/products/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer <tu_token_jwt>" \
  -H "Content-Type: application/json" \
  -d '{"price": 329.99, "stock": 8}'
```

### 5. Eliminar un producto
```bash
curl -X DELETE http://localhost:3000/api/products/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer <tu_token_jwt>"
```

---

## 🔄 Flujo de la Aplicación

```
┌─────────────────┐
│   Cliente       │
└────────┬────────┘
         │
         ├─→ GET /api/products (Público)
         │
         ├─→ POST /api/users/login (Público)
         │   ↓
         │   Recibe token JWT
         │
         ├─→ POST /api/products (Protegido + Admin)
         │   ├─ Authorization: Bearer <token>
         │   ├─ Middleware protect: Valida token
         │   ├─ Middleware admin: Verifica rol
         │   └─ ProductController: Procesa solicitud
         │       └─→ MongoDB: Guarda producto
         │
         └─→ Response (JSON)
```

---

## 📝 Variables de Entorno

Archivo: `.env`

```env
# Servidor
PORT=3000

# MongoDB Atlas
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/?appName=nombre-app

# JWT
JWT_SECRET=tu_clave_secreta_super_segura_12345

# Entorno
NODE_ENV=development
```

---

## 🚧 Estado del Proyecto

| Funcionalidad | Estado | Notas |
|--------------|--------|-------|
| Estructura MVC | ✅ Completo | Bien organizado |
| Modelos | ✅ Completo | User, Product, Category |
| Productos CRUD | ✅ Completo | Con filtros y búsqueda |
| Autenticación JWT | ⚙️ Parcial | Estructura lista, login/registro en desarrollo |
| Autorización (roles) | ✅ Completo | Middleware protect y admin |
| Categorías | 🔄 En desarrollo | Rutas básicas, necesita controlador |
| Usuarios | 🔄 En desarrollo | Rutas básicas, falta lógica de negocio |
| Docker | 🔄 En desarrollo | Dockerfile y docker-compose vacíos |
| Validación avanzada | 🔄 Pendiente | Expandir validaciones |
| Tests | 🔄 Pendiente | Agregar pruebas unitarias |

---

## 📚 Próximos Pasos

1. **Completar módulo de Usuarios**
   - Implementar login con generación de JWT
   - Implementar registro con validaciones
   - Listar usuarios (solo admin)

2. **Completar módulo de Categorías**
   - Implementar CRUD completo
   - Relación con productos

3. **Mejorar validaciones**
   - Usar bibliotecas como `joi` o `yup`
   - Validar en cliente

4. **Documentación API**
   - Implementar Swagger/OpenAPI
   - Generar documentación interactiva

5. **Tests**
   - Tests unitarios con Jest
   - Tests de integración

6. **Docker**
   - Completar Dockerfile
   - Completar docker-compose.yml

7. **Funcionalidades adicionales**
   - Carrito de compras
   - Órdenes/Pedidos
   - Sistema de calificaciones
   - Notificaciones por email

---

## 🐛 Solución de Problemas

### Error: "Cannot find module mongoose"
```bash
npm install
```

### Error: "MONGODB_URI no definido"
Asegúrate de tener un archivo `.env` en la raíz del proyecto con la variable `MONGODB_URI`.

### Error: "Conexión a MongoDB fallida"
Verifica que:
- Tu cadena de conexión de MongoDB Atlas es correcta
- Las credenciales (usuario y contraseña) son válidas
- El cluster está activo en MongoDB Atlas
- La IP de tu máquina está en la lista blanca de MongoDB Atlas

### Error: "Token inválido o expirado"
- Verifica que el token sea enviado en el header `Authorization: Bearer <token>`
- Comprueba que la clave `JWT_SECRET` sea la misma en `.env`

---

## 📞 Contacto y Soporte

Para reportar bugs o sugerencias, crea un issue en el repositorio.

---

## 📄 Licencia

Este proyecto está bajo licencia ISC.

---

**Última actualización**: 7 de mayo de 2026 (Configuración MongoDB Atlas)
