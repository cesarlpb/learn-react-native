import FileUploader from '@/features/uploads/components/FileUploader';
import { StyleSheet, View, Text } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.h2}>File Uploader</Text>
      <View style={styles.uploaderContainer}>
        <FileUploader />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#505050',
    flex: 1, // coloca el contenido en toda la pantalla
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // Asegura que los elementos se alineen al inicio
  },
  h2: {
    color: '#f0f0f0',
    marginTop: 32,
    fontSize: 32,
    fontWeight: 'bold',
  },
  uploaderContainer: {
    width: '80%', // Ocupa el 80% del ancho de la pantalla
    marginTop: 20,
    flex: 1, // Permite que se expanda verticalmente si es necesario
    alignItems: 'center',
    backgroundColor: '#333', // Opcional: un fondo para distinguir el área
    borderRadius: 10, // Bordes redondeados
    padding: 10, // Espaciado interno
  },
});
