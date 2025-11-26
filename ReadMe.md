# ✨ TaskMaster Frontend - Gestión de Tareas

TaskMaster es la interfaz de usuario **responsiva y minimalista** para la aplicación de gestión de tareas Full-Stack. Construida con React y Vite, esta aplicación se integra completamente con la API RESTful de TaskMaster para ofrecer una experiencia de usuario completa.

---

## 🌟 Características y Funcionalidad

El Frontend cumple con los requisitos del trabajo integrador al implementar todas las pantallas necesarias para la interacción del usuario con la API.

### Interfaz de Usuario
* **Diseño Responsivo:** Interfaz adaptativa que funciona correctamente desde **320px hasta 2000px** (móvil, tablet y desktop).
* **Experiencia Clara:** Diseño minimalista y funcional centrado en la usabilidad para gestionar el flujo de tareas.

### Funcionalidad Integrada con la API
* **Autenticación:** Pantallas de **Registro** y **Login** (manejo y persistencia del JWT).
* **Verificación de Email:** Manejo del flujo de activación por correo electrónico.
* **Gestión de Tareas (CRUD):**
    * **Listado:** Muestra todas las tareas del usuario.
    * **Crear y Editar:** Formularios modales para modificar las tareas.
    * **Eliminar:** Botón de eliminación.
    * **Archivar/Desarchivar:** Funcionalidad para mover tareas entre estados activos/archivados.
* **Filtros:** Sistema para organizar y visualizar tareas por estado o criterios específicos.
* **Rutas Protegidas:** Uso de *React Router* y lógica de estado para restringir el acceso a las rutas principales si el usuario no está autenticado.

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Framework** | **React** | Biblioteca principal para construir la interfaz. |
| **Tooling** | **Vite** | Empaquetador y servidor de desarrollo rápido. |
| **Estilos** | **CSS Estándar** | Estilizado enfocado en rendimiento y responsividad. |
| **Despliegue** | **Vercel** | Plataforma de hosting para el despliegue público del Frontend. |

---

## ⚙️ Instalación y Configuración Local

### Prerrequisitos
* **Node.js** (versión recomendada: 18+ o superior)
* El **TaskMaster Backend** debe estar corriendo (o usar la versión desplegada).

### Pasos para el Setup
1.  **Clonar el Repositorio:**
    ```bash
    git clone [https://github.com/alee093/TaskMaster_frontend.git](https://github.com/alee093/TaskMaster_frontend.git)
    cd TaskMaster_frontend
    ```

2.  **Instalar Dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo llamado `.env` en la raíz del proyecto y establece la URL de tu API de Backend:

    ```env
    VITE_API_URL="[https://taskmaster-backend-1-7xl6.onrender.com](https://taskmaster-backend-1-7xl6.onrender.com)"
    # Si estás corriendo el backend localmente, usa:
    # VITE_API_URL="http://localhost:3001"
    ```

4.  **Iniciar la Aplicación:**
    ```bash
    npm run dev
    ```

    La aplicación se iniciará típicamente en `http://localhost:5173`.

---

## 📸 Capturas de Pantalla (Ejemplo de Interfaz)
hay una carpeta que se llama screenshots, ahi podes encontrar todas las imagenes de este proyecto

## 🔗 Enlaces del Proyecto

* **Web App Desplegada (Frontend):** `https://task-master-frontend-nu.vercel.app`
* **API Desplegada (Backend):** `https://taskmaster-backend-1-7xl6.onrender.com`
* **Repositorio Backend:** [TaskMaster_backend](https://github.com/alee093/TaskMaster_backend)

---

## 🤝 Autor y Contacto

* **Autor:** instagram: alee_baran - email: baran.alejandro04@gmail.com