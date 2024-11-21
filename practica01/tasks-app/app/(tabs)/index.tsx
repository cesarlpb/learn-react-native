import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { useEffect, useState } from 'react';
import { testConnection } from '../supabaseClient';
import TaskList from '@/crud/TaskList';
import TaskForm from '@/crud/TaskForm';

// useEffect(() => {
//   testConnection(); // Llama a la prueba de conexión al cargar la app
// }, []);

import { supabase } from '../supabaseClient';

// Define el tipo de las tareas
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function HomeScreen() {

  const [reload, setReload] = useState(false); // Estado que controla cuándo recargar

  const handleSave = () => {
    console.log('Tarea guardada');
    // Recargar tareas:
    setReload((prev) => !prev); // Cambia el estado para forzar la recarga
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bienvenid@ a Tasks-App!</ThemedText>
        <HelloWave />
      </ThemedView>

      <TaskList reload={reload} />
      <TaskForm onSave={handleSave} />

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  }
});
