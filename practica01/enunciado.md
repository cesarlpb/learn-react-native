## CRUD Simple con React Native y backend de Supabase

Crea una funcionalidad básica que permita gestionar una lista de tareas:

### Backend (Supabase)

Tabla: `tasks`
- `id` (UUID, Primary Key)
- `title` (Varchar)
- `description` (Text, opcional)
- `completed` (Boolean)
- `user_id` (UUID, referencia al usuario autenticado)

**Importante:** Activa Row-Level Security (RLS) para que cada usuario solo pueda ver/modificar sus tareas.

### Frontend

- Pantalla para listar tareas.
- Pantalla para crear/editar tareas (con validación).
- Posibilidad de marcar una tarea como completada.
- Función de eliminar tarea con confirmación.

### Retos

- Implementar paginación para la lista de tareas.
- Filtrar tareas por completadas/no completadas.
