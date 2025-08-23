# Clappy

Clappy es una aplicación web full-stack diseñada para la gestión de usuarios, pagos y stock, con paneles de control dedicados tanto para clientes como para administradores. La aplicación está completamente dockerizada para un despliegue y desarrollo sencillos.

## ✨ Características

- **Autenticación de Usuarios:** Registro, inicio de sesión, recuperación y reseteo de contraseña.
- **Panel de Cliente:**
  - Visualización de información principal.
  - Historial de pagos.
  - Gestión de perfil.
- **Panel de Administración:**
  - Dashboard con métricas clave.
  - Gestión de usuarios.
  - Lista y registro de pagos.
  - Control de stock.
  - Configuración del sistema.
- **API RESTful:** Backend robusto para servir datos a la aplicación cliente.

## 🚀 Tecnologías Utilizadas

### Frontend
- **React:** Biblioteca para construir interfaces de usuario.
- **Vite:** Entorno de desarrollo y empaquetador de próxima generación.
- **React Router:** Para el enrutamiento del lado del cliente.
- **Axios:** Cliente HTTP para realizar peticiones a la API.
- **Tailwind CSS:** Framework de CSS para un diseño rápido y personalizable.
- **Radix UI:** Componentes de UI de bajo nivel para construir un sistema de diseño accesible.

### Backend
- **Django:** Framework web de alto nivel para un desarrollo rápido y seguro.
- **Django REST Framework:** Toolkit para construir APIs web.
- **PostgreSQL:** Sistema de base de datos relacional de objetos.

### DevOps
- **Docker:** Plataforma para desarrollar, enviar y ejecutar aplicaciones en contenedores.
- **Docker Compose:** Herramienta para definir y ejecutar aplicaciones Docker multi-contenedor.

## 📂 Estructura del Proyecto

El proyecto está organizado en dos directorios principales:

- **`/frontend`**: Contiene la aplicación de React.
- **`/backend`**: Contiene la aplicación de Django y la API REST.

Cada directorio tiene su propio `dockerfile` para construir la imagen correspondiente.

## 🏁 Cómo Empezar

Sigue estos pasos para levantar el entorno de desarrollo local.

### Prerrequisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd clappy
    ```

2.  **Crea el archivo de variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables, que son utilizadas por el servicio de `backend`:
    ```env
    POSTGRES_DB=yourdb
    POSTGRES_USER=youruser
    POSTGRES_PASSWORD=yourpassword
    POSTGRES_HOST=db
    
    # Django
    SECRET_KEY='tu_super_secreto_aqui'
    DEBUG=True
    ```

3.  **Levanta los servicios con Docker Compose:**
    ```bash
    docker-compose up --build
    ```

4.  **Accede a la aplicación:**
    - **Frontend:** `http://localhost:3000`
    - **Backend API:** `http://localhost:8000`

¡Y eso es todo! Ahora tienes el entorno de Clappy corriendo en tu máquina local.
