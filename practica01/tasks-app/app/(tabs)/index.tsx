import { useState } from 'react';

import { StyleSheet, SectionList } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import TaskList from '@/crud/TaskList';
import TaskForm from '@/crud/TaskForm';

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
    setReload((prev) => !prev); // Cambia el estado para forzar la recarga
  };

  const sections = [
    {
      title: 'Bienvenid@ a Tasks-App!',
      data: [{}], // Encabezado y saludo
      renderItem: () => (
        <ThemedView style={styles.header}></ThemedView>
      ),
    },
    {
      title: 'Tareas',
      data: [{}], // Aquí puedes incluir la lista de tareas real si lo deseas
      renderItem: () => <TaskList reload={reload} />,
    },
    {
      title: 'Formulario',
      data: [{}],
      renderItem: () => <TaskForm onSave={handleSave} />,
    },
  ];

  return (
    <SectionList
      style={styles.mainContainer}
      sections={sections}
      keyExtractor={(item, index) => `section-${index}`}
      renderSectionHeader={({ section: { title } }) => (
        <ThemedText style={styles.sectionHeader}>{title}</ThemedText>
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#505050',
    color: '#d0d0d0',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#505050',
    color: '#d0d0d0',
  },
  sectionHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 0,
    marginTop:75,
    color: '#d0d0d0',
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 0,
    color: '#d0d0d0',
  },
  reactLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginVertical: 20,
    color: '#d0d0d0',
  },
});
