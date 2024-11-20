import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = `${process.env.EXPO_PUBLIC_SUPABASE_URL}`;
const SUPABASE_KEY = `${process.env.EXPO_PUBLIC_SUPABASE_KEY}`;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Las variables de entorno SUPABASE_URL y SUPABASE_KEY deben estar definidas.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Prueba de conexión
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('tasks').select('*').limit(5);
    if (error) {
      console.error('Error al conectar con Supabase:', error);
    } else {
      console.log('Conexión exitosa. Datos:', data);
    }
  } catch (err) {
    console.error('Error inesperado:', err);
  }
};