import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,                   // Ocupa toda la pantalla
    justifyContent: 'center',  // Centra verticalmente
    alignItems: 'center',      // Centra horizontalmente
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
    color: '#333',
  },
  link: {
    fontSize: 16,
    color: '#007aff',
    marginVertical: 5,
  },
  signIn: {
    display: 'flex',
    backgroundColor: '#4f39f6',
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16, 
    borderRadius: 8
  },
  signUp: {

  }
});
