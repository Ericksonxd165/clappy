# Backend de Clappy | Documentación

![Django](https://img.shields.io/badge/Django-4.2-blue?style=for-the-badge&logo=django)
![Django REST](https://img.shields.io/badge/Django%20REST-3.14-red?style=for-the-badge&logo=django)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=for-the-badge&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-20.10-blue?style=for-the-badge&logo=docker)

Este es el backend de la aplicación **Clappy**, construido con Django y Django REST Framework. Proporciona una API RESTful para gestionar toda la lógica de negocio, incluyendo usuarios, productos, pagos y notificaciones.

## 📋 Tabla de Contenidos

1.  [Resumen General](#-resumen-general)
2.  [Tecnologías](#-tecnologías)
3.  [Cómo Empezar](#-cómo-empezar)
    -   [Prerrequisitos](#prerrequisitos)
    -   [Configuración Local](#configuración-local)
4.  [Ejecución de Pruebas](#-ejecución-de-pruebas)
5.  [Variables de Entorno](#-variables-de-entorno)
6.  [Estructura del Proyecto](#-estructura-del-proyecto)
7.  [Documentación de la API](#-documentación-de-la-api)
    -   [Autenticación y Usuarios](#autenticación-y-usuarios)
    -   [Gestión de Usuarios (Admin)](#gestión-de-usuarios-admin)
    -   [App "Clap"](#app-clap)

---

## 📝 Resumen General

El backend se encarga de:
-   **Gestión de Usuarios:** Autenticación, perfiles y roles.
-   **Lógica de Negocio:** Administración de productos (cajas), pagos y stock.
-   **Notificaciones:** Sistema para mantener informados a los usuarios sobre eventos importantes.
-   **Seguridad:** Autenticación basada en JSON Web Tokens (JWT).

## 🛠️ Tecnologías

-   **Framework:** Django, Django REST Framework
-   **Base de Datos:** PostgreSQL (Producción/Desarrollo), SQLite (Pruebas)
-   **Autenticación:** djangorestframework-simplejwt
-   **Contenerización:** Docker, Docker Compose
-   **Testing:** Pytest

## 🚀 Cómo Empezar

### Prerrequisitos

-   Python 3.9+
-   Docker y Docker Compose
-   Git

### Configuración Local

1.  **Clonar el repositorio** (si aún no lo has hecho):
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd clappy
    ```

2.  **Navegar al directorio del backend:**
    ```bash
    cd backend
    ```

3.  **Crear y activar un entorno virtual:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # En Windows: venv\Scripts\activate
    ```

4.  **Instalar dependencias:**
    ```bash
    pip install -r requirements.txt
    ```

5.  **Configurar las variables de entorno:**
    Crea un archivo `.env` en el directorio `backend/` (puedes duplicar y renombrar `.env.example` si existe) y configúralo como se describe en la sección [Variables de Entorno](#-variables-de-entorno).

6.  **Ejecutar las migraciones de la base de datos:**
    ```bash
    python manage.py migrate
    ```

7.  **Crear un superusuario (opcional):**
    ```bash
    python manage.py create_admin_user --username admin --password adminpass --email admin@example.com
    ```

8.  **Iniciar el servidor de desarrollo:**
    ```bash
    python manage.py runserver
    ```
    La API estará disponible en `http://localhost:8000`.

## ✅ Ejecución de Pruebas

Para ejecutar la suite de pruebas automatizadas, utiliza `pytest`:
```bash
pytest
```
Las pruebas se ejecutan contra una base de datos SQLite en memoria para mayor velocidad.

## ⚙️ Variables de Entorno

El backend requiere las siguientes variables de entorno para funcionar. Deben estar definidas en un archivo `.env` en el directorio `backend/`.

| Variable         | Descripción                                      | Ejemplo                               |
| :--------------- | :----------------------------------------------- | :------------------------------------ |
| `SECRET_KEY`     | Clave secreta de Django para seguridad criptográfica. | `'django-insecure-your-secret-key'`   |
| `DEBUG`          | Activa/desactiva el modo de depuración de Django.    | `True`                                |
| `POSTGRES_DB`    | Nombre de la base de datos de PostgreSQL.        | `yourdb`                              |
| `POSTGRES_USER`  | Usuario para la base de datos.                   | `youruser`                            |
| `POSTGRES_PASSWORD`| Contraseña para el usuario de la base de datos.  | `yourpassword`                        |
| `POSTGRES_HOST`  | Host donde se ejecuta la base de datos.          | `db` (en Docker) o `localhost`        |
| `POSTGRES_PORT`  | Puerto de la base de datos.                      | `5432`                                |
| `EMAIL_HOST_USER`| Correo para el envío de notificaciones.          | `tu-correo@gmail.com`                 |
| `EMAIL_HOST_PASSWORD`| Contraseña del correo (o contraseña de app). | `tu-contraseña`                       |

## 📁 Estructura del Proyecto

El backend se divide en dos aplicaciones principales de Django:

-   **`users`**: Contiene toda la lógica para el registro, autenticación, gestión de perfiles de usuario y recuperación de contraseñas.
-   **`clap`**: Maneja la funcionalidad principal de la aplicación, incluyendo la gestión de "cajas" (productos), el registro de pagos, el sistema de notificaciones y las configuraciones del administrador.

---

## 🌐 Documentación de la API

A continuación se detallan los endpoints más importantes.

**URL Base:** `/api/v1/`

### Autenticación y Usuarios
*Ruta base: `/users/`*

| Método | Endpoint                                    | Permisos      | Descripción                                            |
| :----- | :------------------------------------------ | :------------ | :----------------------------------------------------- |
| `POST` | `/register/`                                | `Público`     | Registra un nuevo usuario.                             |
| `POST` | `/login/`                                   | `Público`     | Autentica y devuelve un par de tokens JWT.             |
| `POST` | `/token/refresh/`                           | `Público`     | Refresca un token de acceso JWT expirado.              |
| `GET`  | `/me/`                                      | `Autenticado` | Obtiene los datos del perfil del usuario actual.       |
| `PUT`  | `/me/`                                      | `Autenticado` | Actualiza los datos del perfil del usuario actual.     |
| `POST` | `/password-reset/`                          | `Público`     | Inicia el proceso de recuperación de contraseña.       |
| `POST` | `/password-reset-confirm/<uidb64>/<token>/` | `Público`     | Confirma y establece una nueva contraseña.             |

### Gestión de Usuarios (Admin)
*Ruta base: `/users/users/`*

| Método   | Endpoint | Permisos        | Descripción                       |
| :------- | :------- | :-------------- | :-------------------------------- |
| `GET`    | `/`      | `Administrador` | Lista todos los usuarios.         |
| `POST`   | `/`      | `Administrador` | Crea un nuevo usuario.            |
| `GET`    | `/<id>/` | `Administrador` | Obtiene los detalles de un usuario.|
| `PUT`    | `/<id>/` | `Administrador` | Actualiza un usuario.             |
| `DELETE` | `/<id>/` | `Administrador` | Elimina un usuario.               |

### App "Clap"
*Ruta base: `/clap/`*

#### Cajas (Productos)
| Método | Endpoint                    | Permisos        | Descripción                                      |
| :----- | :-------------------------- | :-------------- | :----------------------------------------------- |
| `GET`  | `/cajas/`                   | `Autenticado`   | Lista todas las cajas disponibles.               |
| `POST` | `/cajas/`                   | `Administrador` | Crea una nueva caja.                             |
| `PUT`  | `/cajas/<id>/`              | `Administrador` | Actualiza una caja.                              |
| `POST` | `/cajas/clear_season_data/` | `Administrador` | **Acción Crítica:** Reinicia la "temporada".     |

#### Pagos
| Método | Endpoint                                | Permisos        | Descripción                                      |
| :----- | :-------------------------------------- | :-------------- | :----------------------------------------------- |
| `GET`  | `/cajaspersona/`                        | `Autenticado`   | Lista los pagos (propios o todos si es admin).   |
| `POST` | `/cajaspersona/`                        | `Autenticado`   | Registra un nuevo pago para la caja actual.      |
| `POST` | `/cajaspersona/<id>/approve_payment/`   | `Administrador` | Aprueba un pago pendiente.                       |
| `POST` | `/cajaspersona/<id>/reject_payment/`    | `Administrador` | Rechaza un pago pendiente.                       |

... y otros endpoints para notificaciones, configuraciones y más.