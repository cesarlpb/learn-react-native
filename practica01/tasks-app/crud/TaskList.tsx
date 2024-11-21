import React, { useEffect, useState } from 'react';
import { supabase } from '../app/supabaseClient';

// Define el tipo de las tareas
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      if (!error && data) setTasks(data as Task[]); // Cast explícito de Task
    };

    fetchTasks();
  }, []);

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