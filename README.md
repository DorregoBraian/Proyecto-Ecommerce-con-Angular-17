## Introducción

### Este proyecto fue desarrollado como parte de mi aprendizaje en Angular 17. Es una aplicación web didáctica de una tienda de Ropa online que permite a los usuarios navegar, buscar, comprar productos y demás. A lo largo del desarrollo, implementé varias funcionalidades clave utilizando servicios, componentes y directivas de Angular 17, así como integración con APIs para obtener datos y gestionar la autenticación de usuarios.

## Contenidos del Proyecto

### 1. **Arquitectura del Proyecto**

-   **Componentes:** Estructura modular con componentes reutilizables.
-   **Servicios:** Servicios para manejar datos de productos, autenticación y local storage.
-   **Rutas:** Navegación implementada con el Router de Angular.
-   **Pipes y Directivas Personalizadas:** Pipes para formateo de datos y directivas para la manipulación del DOM.

### 2. **Tecnologías Utilizadas**

-   **Firebase (Authentication, Storage y Cloud Firestore):** Gestión de usuarios y almacenamiento de datos e imagenes.
-   **Bootstrap:** Diseño responsive y componentes estilizados.
-   **API REST Fake Store API:** Proporciona los datos de productos de forma dinámica.
-   **Local Storage:** Para almacenar productos en el carritos y los favoritos.
-   **FormSubmit:** Herramienta para enviar datos del formulario a un email.
-    **icons8:** Herramienta para obtener iconos.

### 3. **Características Implementadas**

-   **Autenticación de Usuarios:** Registro, inicio de sesión y manejo de usuarios autenticados con Firebase.
-   **Gestión de Carrito de Compras:** Añadir, eliminar y modificar cantidades de productos en el carrito, con persistencia en local storage y Firestore.
-   **Filtro de Productos:** Búsqueda y filtrado de productos por categoría y se implemento cambio de moneda al precio.
-   **Sistema de Navegación Dinámica:** Cambios de vista basados en las acciones del usuario, utilizando el enrutador de Angular.
-   **Integración con API REST:** Obtención de datos de productos desde una API externa.
-    **Modo Nocturno:** Cambia el aspecto de la pagina a un tono mas Oscuro.
-    **Favoritos:** Se introduzco un botón de favoritos al momento de comprar el producto.
-    **Foto de Perfil:** Al momento de registrarse el usuario tiene la posibilidad de subir una foto de perfil.
