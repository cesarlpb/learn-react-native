# Práctica 02: Uso de Storage en Supabase

## Objetivo
Aprender a utilizar el sistema de almacenamiento de Supabase para gestionar archivos 
desde una aplicación frontend desarrollada con React Native. 
Implementarás funcionalidades básicas para subir, listar, descargar y eliminar archivos.

---

## Requisitos

1. **Backend: Supabase**
   - Tener un proyecto en Supabase con un bucket de almacenamiento configurado.

2. **Frontend: React Native**
   - Proyecto configurado para usar la biblioteca `@supabase/supabase-js`.
   - Conexión al backend de Supabase previamente configurada.

3. **Conocimientos previos:**
   - Conexión a Supabase desde el frontend.
   - Manejo básico de formularios y eventos en React Native.
   - Operaciones CRUD con un backend.

---

## Enunciado

### 1. Configuración inicial

1. **Crea un bucket en Supabase:**
   - Ve a la sección **Storage** en tu proyecto de Supabase.
   - Crea un bucket llamado `uploads`.
   - Configura las políticas de acceso:
     - Habilita la visibilidad pública o define políticas de acceso personalizado para los archivos según sea necesario.
     - Para prácticas iniciales, permite acceso público.

2. **Configura el cliente de Supabase:**

  **Realizado en Práctica 01. Se usará el mismo componente.**

   - Asegúrate de que tu archivo `supabaseClient` esté configurado correctamente con las variables de entorno de tu proyecto:
     ```javascript
     import { createClient } from '@supabase/supabase-js';

     const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
     const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY;

     export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
     ```

---

## 2. Funcionalidades a implementar

1. **Subir un archivo:**
   - Implementa un formulario con un botón para seleccionar un archivo desde el dispositivo.
   - Usa la API de `supabase.storage.from('uploads').upload()` para subir el archivo al bucket.

2. **Listar archivos:**
   - Implementa una lista que muestre los nombres de los archivos almacenados en el bucket.
   - Usa la API de `supabase.storage.from('uploads').list()` para obtener la lista de archivos.

3. **Descargar un archivo:**
   - Añade un botón en cada elemento de la lista para descargar el archivo.
   - Usa la API de `supabase.storage.from('uploads').getPublicUrl(filename)` para obtener el enlace público del archivo.

4. **Eliminar un archivo:**
   - Añade un botón en cada elemento de la lista para eliminar el archivo.
   - Usa la API de `supabase.storage.from('uploads').remove([filename])` para borrar el archivo.

---

## Retos adicionales

1. **Privacidad:**
   - Configura el bucket como privado y utiliza políticas RLS para limitar el acceso a los archivos según el usuario autenticado.

2. **Mostrar miniaturas:**
   - Si los archivos son imágenes, muestra una miniatura en lugar del nombre del archivo en la lista.

3. **Progreso de subida:**
   - Muestra un indicador de progreso mientras el archivo se sube.

4. **Validación de archivos:**
   - Restringe los tipos de archivos permitidos (por ejemplo, solo imágenes PNG o JPEG).

---

## Entregables

1. Código funcional con las funcionalidades implementadas.
2. Capturas de pantalla o video mostrando las funcionalidades en acción.
3. Responde a las siguientes preguntas en un archivo Markdown:
   - ¿Qué ventajas tiene usar el sistema de Storage de Supabase frente a una solución personalizada?
   - ¿Qué desafíos encontraste al implementar las políticas de acceso (si las configuraste)?

---

¡Buena suerte y diviértete aprendiendo! 🎉