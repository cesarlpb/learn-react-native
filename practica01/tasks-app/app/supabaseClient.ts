import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://<your-project-id>.supabase.co';
const SUPABASE_KEY = '<public-anon-key>';

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