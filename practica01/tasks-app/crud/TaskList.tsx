import React, { useEffect, useState } from 'react';
import { supabase } from '../app/supabaseClient';

// Define el tipo de las tareas
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  reload: boolean; // Propiedad que indica cuándo recargar
}

const TaskList: React.FC<TaskListProps> = ({ reload }) => {

  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: false });
    if (!error && data) setTasks(data as Task[]); // Cast explícito de Task
  };

  // Función para borrar una tarea
  const deleteTask = async (taskId: number) => {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (!error) {
      // Actualiza la lista eliminando la tarea localmente
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } else {
      console.error('Error al borrar la tarea:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Carga inicial
  }, []);

  useEffect(() => {
    if (reload) {
      fetchTasks(); // Recarga cuando `reload` cambia
    }
  }, [reload]);

  return (
    <ul
      style={{
        color: 'white',
        textTransform: 'capitalize',
        listStyle: 'none', // Elimina los puntos de las listas
        padding: 0, // Remueve el padding del contenedor
        margin: 0, // Remueve el margen del contenedor
      }}
    >
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            display: 'flex', // Flexbox para alinear el contenido
            alignItems: 'center', // Centra verticalmente el contenido
            justifyContent: 'space-between', // Espacio entre título y botón
            marginBottom: '10px', // Espaciado entre tareas
            padding: '10px', // Espaciado interno para cada tarea
            border: '1px solid #444', // Agrega un borde sutil
            borderRadius: '5px', // Bordes redondeados
            backgroundColor: '#333', // Fondo oscuro para contraste
          }}
        >
          <span>
            {task.title} - {task.completed ? '✅' : '❌'}
          </span>
          <button
            onClick={() => deleteTask(task.id)} // Llama a deleteTask con el ID de la tarea
            style={{
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              padding: '5px 10px', // Ajusta el tamaño del botón
              fontSize: '0.9rem',
              transition: 'background-color 0.3s', // Agrega una transición suave
            }}
            onMouseOver={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = 'darkred')
            }
            onMouseOut={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = 'red')
            }
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
};  

export default TaskList;