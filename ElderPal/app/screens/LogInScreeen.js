import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>ElderPal</Text>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Logo.png')} 
          style={styles.logo}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Login Pressed')}>
          <Text style={styles.buttonTextin}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => console.log('Sign Up Pressed')}>
          <Text style={styles.buttonTextup}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#199BC3',
  },
  appName: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 220, 
    height: 220, 
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: 50,
    flexDirection: 'column', 
  },
  button: {
    backgroundColor: '#29CF9D',
    borderRadius: 45, // curving edges
    paddingVertical: 20, // height increase
    paddingHorizontal: 70, // length increase
    marginBottom: 15, // gap between buttons
  },
  buttonTextin: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  buttonTextup: {
    color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
  },
});

export default App;
