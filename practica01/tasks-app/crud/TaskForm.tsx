import React, { useState, CSSProperties } from 'react';
import { supabase } from '../app/supabaseClient';

interface TaskFormProps {
  onSave: () => void; // onSave es obligatorio
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    
    console.log("Datos del form:");
    console.log(title);
    console.log(description);

    const user = supabase.auth.getUser();
    let userId = (await user).data.user?.id;

    if (!userId){
      // id de usuario de prueba:
      userId = `${process.env.EXPO_PUBLIC_ID_PRUEBAS}`;
    }

    const { error } = await supabase.
                                from('tasks').
                                insert([
                                  { 
                                    title: title.trim(),
                                    description: description.trim(),
                                    user_id: userId,
                                  }
                                ]);
    if (!error) onSave();
  };

  const styles: { [key: string]: CSSProperties } = {
    h2:{
      textAlign: 'center',
      color: 'white',
      fontSize: '2rem',
      fontFamily: 'sans-serif'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '300px',
      margin: '20px auto',
    },
    input: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '1rem',
      width: '100%',
    },
    textarea: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '1rem',
      width: '100%',
      height: '100px',
      resize: 'none',
    },
    button: {
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };
  
  return (
    <>
    <h2 style={styles.h2}>Nueva Tarea</h2>
    <div style={styles.form}>
      <input
        style={styles.input}
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        style={styles.textarea}
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        style={styles.button}
        onClick={handleSubmit}
        onMouseOver={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = '#0056b3')
        }
        onMouseOut={(e) =>
          ((e.target as HTMLButtonElement).style.backgroundColor = '#007bff')
        }
      >
        Guardar
      </button>
    </div>
    </>
  );
};

export default TaskForm;
