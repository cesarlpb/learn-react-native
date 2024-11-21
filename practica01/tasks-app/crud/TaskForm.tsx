import React, { useState } from 'react';
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
      userId = "<inserta_id_de_pruebas_aquí>"; // id de usuario de prueba
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

  return (
    <div>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>Guardar</button>
    </div>
  );
};

export default TaskForm;
