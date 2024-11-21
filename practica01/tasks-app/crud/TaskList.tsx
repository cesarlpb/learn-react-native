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

  useEffect(() => {
    fetchTasks(); // Carga inicial
  }, []);

  useEffect(() => {
    if (reload) {
      fetchTasks(); // Recarga cuando `reload` cambia
    }
  }, [reload]);

  return (
    <ul style={{color: 'white', textTransform: 'capitalize'}}>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title} - {task.completed ? '✅' : '❌'}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;