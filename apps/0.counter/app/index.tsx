
import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";

export default function Index() {
  // Copio el código de App.jsx de React:
  // Creamos el estado para el contador -> variable global
  const [counter, setCounter] = useState(0);

  const handleIncrement = function(){
    // counter += 1;        // no funciona
    // setCounter(++counter)// no funciona
    setCounter(prev => prev + 1)
  }
  const handleDecrement = function(){
    setCounter(prev => prev - 1)
  }
  const handleReset = function(){
    // window.location.reload()
    // Es mejor reiniciar el estado que recargar la página
    setCounter(0)
  }
  // Hasta aquí el código de React ^
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Counter</Text>
      <Text style={styles.display}>0</Text>
      <Text style={styles.button} onPress={handleIncrement}>Incrementar</Text>
      <Text style={styles.button} onPress={handleDecrement}>Decrementar</Text>
      <Text style={[styles.button, styles.resetButton]} onPress={handleReset}>Reiniciar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    // flexDirection: 'column',
    flex: 1,
    backgroundColor: 'aquamarine',
    alignContent: 'center',
    justifyContent: 'center'
  },
  h1: {
    fontSize: 32,
    marginTop: 16,
    marginBottom: 16,
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    textAlign: 'center'
  },
  display: {
    fontSize: 40,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '500',
    fontFamily: 'Segoe UI',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 7,
    width: 150,
    textAlign: 'center'
  },
  resetButton: {
    backgroundColor: 'red'
  }
})
