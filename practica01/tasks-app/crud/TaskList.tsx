import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import supabase from '@app/supabaseClient';

// Define el tipo de las tareas
interface Task {
  id: number;
  title: string;
  description: string;
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
    if (!error && data) setTasks(data as Task[]);
  };

  const markAsCompleted = async (id: number) => {
    const { error } = await supabase.from('tasks').update({ completed: true }).eq('id', id);
    if (!error) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? { ...task, completed: true } : task))
      );
    } else {
      console.error('Error al marcar como completado:', error);
    }
  };

  const deleteTask = async (taskId: number) => {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (!error) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } else {
      console.error('Error al borrar la tarea:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (reload) {
      fetchTasks();
    }
  }, [reload]);

  return (
    <FlatList
  data={tasks}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>
        {item.title}: {item.description}
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, item.completed ? styles.completedButton : styles.markButton]}
          onPress={() => markAsCompleted(item.id)}
          disabled={item.completed}
        >
          <Text style={styles.buttonText}>
            {item.completed ? 'Completado' : 'Completar'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => deleteTask(item.id)}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
  nestedScrollEnabled={true}
  contentContainerStyle={{ paddingBottom: 20 }}
/>

  );  
};

const styles = StyleSheet.create({
  taskItem: {
    backgroundColor: '#333',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#444',
    borderWidth: 1,
  },
  taskText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  markButton: {
    backgroundColor: 'green',
  },
  completedButton: {
    backgroundColor: 'gray',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default TaskList;
