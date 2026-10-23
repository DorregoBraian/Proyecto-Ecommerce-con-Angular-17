<div align="center">

<img src="./public/faviconTienda.png" width="112" alt="RopaStore" />

# RopaStore

**E-commerce de ropa desarrollado con Angular, Firebase y Bootstrap.**

[![Angular](https://img.shields.io/badge/Angular-18.1-dd0031?style=flat-square&logo=angular)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952b3?style=flat-square&logo=bootstrap)](https://getbootstrap.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore%20%2B%20Storage-ffca28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![Fake Store API](https://img.shields.io/badge/API-Fake%20Store-34d399?style=flat-square)](https://fakestoreapi.com/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-181717?style=flat-square&logo=github)](https://dorregobraian.github.io/Proyecto-Ecommerce-con-Angular-17/)

[Demo en vivo](https://dorregobraian.github.io/Proyecto-Ecommerce-con-Angular-17/) · [Repositorio](https://github.com/DorregoBraian/Proyecto-Ecommerce-con-Angular-17)

</div>

---

## Descripción

**RopaStore** es una tienda online de ropa creada como proyecto personal para practicar Angular, autenticación con Firebase y manejo de estado en el frontend.

La aplicación incluye catálogo de productos, filtros por categoría, selector de moneda, detalle de producto, carrito, favoritos, registro e inicio de sesión, foto de perfil y modo oscuro. Los productos se obtienen de **Fake Store API** y la autenticación, los datos de usuario y las imágenes se gestionan con **Firebase**.

> Es un proyecto de aprendizaje: no procesa pagos reales y los productos de la API no son prendas de ropa. La tienda está pensada como demostración de arquitectura y funcionalidades.

---

## Demo

La aplicación está desplegada en GitHub Pages:

**https://dorregobraian.github.io/Proyecto-Ecommerce-con-Angular-17/**

---

## Características

- Catálogo de productos obtenido desde Fake Store API.
- Filtro por categoría.
- Selector de moneda con formato aplicado a los precios.
- Vista de detalle de producto.
- Carrito de compras por usuario.
- Favoritos por usuario.
- Registro e inicio de sesión con Firebase Authentication.
- Foto de perfil opcional subida a Firebase Storage.
- Datos del usuario guardados en Cloud Firestore.
- Cierre de sesión.
- Buscador por nombre en el header (implementación inicial).
- Modo claro / oscuro.
- Formulario de contacto con FormSubmit.
- Páginas de inicio, tienda, acerca de, blog, contacto, carrito, login y registro.
- Header y footer ocultos en las pantallas de login y registro.
- Diseño responsive con Bootstrap.
- Despliegue en GitHub Pages con `angular-cli-ghpages`.

---

## Stack

| Tecnología | Uso |
| --- | --- |
| **Angular 18.1** | Framework principal, componentes standalone y routing. |
| **TypeScript 5.5** | Tipado de componentes, modelos y servicios. |
| **RxJS** | Observables y consumo de APIs. |
| **Bootstrap 5.3** | Grid, componentes y estilos responsive. |
| **Firebase Authentication** | Registro, login y sesión de usuarios. |
| **Cloud Firestore** | Documentos de usuario en la colección `User`. |
| **Firebase Storage** | Foto de perfil en `users/{uid}/profile.jpg`. |
| **Fake Store API** | Catálogo y detalle de productos. |
| **FormSubmit** | Envío del formulario de contacto por email. |
| **localStorage** | Carrito y favoritos por usuario. |
| **Karma + Jasmine** | Base de pruebas generadas por Angular CLI. |
| **angular-cli-ghpages** | Publicación en GitHub Pages. |

---

## Arquitectura

```text
AppComponent
├── Header
│   ├── Buscador
│   ├── Carrito
│   ├── Menú de usuario
│   ├── Foto de perfil
│   └── Modo oscuro
├── RouterOutlet
│   ├── Home
│   ├── Tienda
│   ├── Detalle de producto
│   ├── Carrito
│   ├── Login
│   ├── Registro
│   ├── Acerca de
│   ├── Blog
│   └── Contacto
└── Footer
```

### Servicios principales

| Servicio | Responsabilidad |
| --- | --- |
| `ServiceApiService` | Consumo de Fake Store API. |
| `ServiceFirebaseService` | Auth, Firestore y Storage. |
| `ServiceLocalStorageService` | Carrito y favoritos por `userId`. |

### Flujo de autenticación

```text
Registro
  → Firebase Authentication
  → subida opcional de foto a Storage
  → documento en Firestore (colección User)
  → redirección al home

Login
  → Firebase Authentication
  → redirección al home

Sesión
  → authState()
  → header muestra foto y menú de cuenta
```

### Persistencia del carrito

El carrito y los favoritos se guardan en `localStorage` con claves separadas por usuario:

```text
listCarrito_<uid>
listFavoritos_<uid>
```

Cada producto del carrito se almacena como `[idProducto, cantidad]`.

---

## Rutas

| Ruta | Componente | Descripción |
| --- | --- | --- |
| `/home` | `MainComponent` | Página principal con carrusel y destacados. |
| `/tienda` | `TiendaComponent` | Catálogo con filtros y moneda. |
| `/tienda/:id` | `CardDetalleComponent` | Detalle del producto. |
| `/home/:name` | `CardDetalleComponent` | Acceso alternativo al detalle. |
| `/carrito` | `CarritoComponent` | Carrito y favoritos del usuario. |
| `/login` | `LoginComponent` | Inicio de sesión. |
| `/registrar` | `RegistrarComponent` | Registro de usuario. |
| `/acerca-de` | `AcercaDeComponent` | Historia de la tienda. |
| `/blog` | `BlogComponent` | Página de blog (placeholder). |
| `/contacto` | `ContactoComponent` | Formulario de contacto. |
| `**` | — | Redirección a `/home`. |

---

## Estructura del proyecto

```text
Proyecto-Ecommerce-con-Angular-17/
├── public/
│   ├── Acerca de.webp
│   ├── Bolsa.gif
│   ├── Claro.gif
│   ├── Corazon-1.png
│   ├── Corazon-2.gif
│   ├── Oscuro.png
│   ├── Perfil.gif
│   └── faviconTienda.png
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   ├── product.model.ts
│   │   │   └── user.model.ts
│   │   ├── pages/
│   │   │   ├── acerca-de/
│   │   │   ├── blog/
│   │   │   ├── card/
│   │   │   ├── card-detalle/
│   │   │   ├── carrito/
│   │   │   ├── contacto/
│   │   │   ├── footer/
│   │   │   ├── header/
│   │   │   ├── login/
│   │   │   ├── main/
│   │   │   ├── registrar/
│   │   │   └── tienda/
│   │   ├── services/
│   │   │   ├── Api Service/
│   │   │   ├── FireBase/
│   │   │   └── LocalStorage/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.development.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── firebase.json
├── package.json
└── README.md
```

---

## Requisitos

- **Node.js** 18.19+ o 20.11+.
- **npm**.
- **Angular CLI** (opcional; se puede usar `npx`).
- Un proyecto de **Firebase** con Authentication, Firestore y Storage habilitados.
- Conexión a Internet para consumir Fake Store API.

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/DorregoBraian/Proyecto-Ecommerce-con-Angular-17.git
cd Proyecto-Ecommerce-con-Angular-17
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

Reemplazar la configuración de `src/environments/environment.ts` y `src/environments/environment.development.ts` por la de tu propio proyecto:

```ts
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'TU_API_KEY',
    authDomain: 'TU_PROYECTO.firebaseapp.com',
    projectId: 'TU_PROYECTO',
    storageBucket: 'TU_PROYECTO.appspot.com',
    messagingSenderId: 'TU_SENDER_ID',
    appId: 'TU_APP_ID',
  },
};
```

En Firebase hay que habilitar:

- **Authentication** con proveedor Email/Password.
- **Cloud Firestore** con la colección `User`.
- **Storage** para las fotos de perfil.

La configuración web de Firebase es pública por diseño; lo importante es configurar correctamente las reglas de seguridad de Firestore y Storage.

### 4. Levantar el servidor de desarrollo

```bash
npm start
```

La aplicación queda disponible en:

```text
http://localhost:4200/
```

---

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm start` | Servidor de desarrollo en `http://localhost:4200/`. |
| `npm run build` | Build de producción en `dist/mi-app-angular17/browser`. |
| `npm run watch` | Build en modo desarrollo con watch. |
| `npm test` | Pruebas unitarias con Karma y Jasmine. |
| `npx ng deploy --base-href=/Proyecto-Ecommerce-con-Angular-17/` | Deploy a GitHub Pages. |

---

## API utilizada

La aplicación consume **Fake Store API**:

| Endpoint | Uso |
| --- | --- |
| `GET /products` | Listado completo de productos. |
| `GET /products/:id` | Detalle de un producto. |
| `GET /products/categories` | Categorías disponibles. |
| `GET /products/category/:category` | Productos filtrados por categoría. |

La URL base está definida en `ServiceApiService`:

```ts
private baseUrl = 'https://fakestoreapi.com/products';
```

> Fake Store API no ofrece búsqueda por nombre. El buscador del header es una implementación inicial y puede no encontrar coincidencias.

---

## Deploy en GitHub Pages

El proyecto incluye el builder `angular-cli-ghpages`. Para publicar:

```bash
npm run build
npx ng deploy --base-href=/Proyecto-Ecommerce-con-Angular-17/
```

El sitio se publica en:

```text
https://dorregobraian.github.io/Proyecto-Ecommerce-con-Angular-17/
```

---

## Limitaciones

- Los productos de Fake Store API no son prendas de ropa; el catálogo es de demostración.
- El botón **Realizar Compra** no procesa pagos ni genera órdenes.
- El buscador por nombre del header es una primera implementación y no usa un endpoint de búsqueda real.
- No hay guards de ruta: algunas pantallas se pueden abrir sin iniciar sesión.
- El formulario de contacto usa FormSubmit y su `_next` apunta a `localhost:4200`; hay que actualizarlo para producción.
- No hay backend propio: la persistencia de usuario depende de Firebase y el carrito de `localStorage`.
- El blog es una página placeholder.
- Las pruebas incluidas son las generadas por Angular CLI; no hay cobertura funcional completa.
- La configuración de Firebase está en el repositorio; para un entorno real conviene usar variables de entorno y reglas de seguridad adecuadas.
- El proyecto no usa SSR.

---

## Próximos pasos

- Reemplazar Fake Store API por una API propia con productos de ropa.
- Implementar checkout y órdenes.
- Agregar guards de autenticación.
- Mejorar el buscador con un endpoint o filtro local.
- Mover la configuración de Firebase a variables de entorno.
- Agregar pruebas de servicios y componentes principales.
- Mejorar accesibilidad y estados de carga/error.
- Incorporar un panel de administración.

---

## Autor

**Braian Dorrego**

- GitHub: [@DorregoBraian](https://github.com/DorregoBraian)
- LinkedIn: [Braian Nahuel Dorrego](https://www.linkedin.com/in/braian-nahuel-dorrego-b76381b2/)
- Repositorio: [Proyecto-Ecommerce-con-Angular-17](https://github.com/DorregoBraian/Proyecto-Ecommerce-con-Angular-17)

Proyecto personal de aprendizaje · 2024

---

## Nota sobre la versión de Angular

El repositorio conserva el nombre **Angular 17** y el README original hace referencia a esa versión. Las dependencias actuales de `package.json` corresponden a **Angular 18.1**.
