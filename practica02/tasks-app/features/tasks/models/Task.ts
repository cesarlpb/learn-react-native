// Modelo de tarea para cliente de supabase

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default Task;