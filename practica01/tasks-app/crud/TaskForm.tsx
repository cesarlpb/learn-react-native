import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import supabase from '../app/supabaseClient';

interface TaskFormProps {
  onSave: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    console.log('Datos del form:');
    console.log(title);
    console.log(description);

    const user = supabase.auth.getUser();
    let userId = (await user).data.user?.id;

    if (!userId) {
      // ID de usuario de prueba:
      userId = `${process.env.EXPO_PUBLIC_ID_PRUEBAS}`;
    }

    const { error } = await supabase
      .from('tasks')
      .insert([
        {
          title: title.trim(),
          description: description.trim(),
          user_id: userId,
        },
      ]);

    if (!error) onSave();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#ccc"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Descripción"
        placeholderTextColor="#ccc"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    color: 'white',
    backgroundColor: '#333',
    marginBottom: 10,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskForm;
