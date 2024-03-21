import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const App = ({ navigation }) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleButtonPressIn = () => {
    setIsButtonPressed(true);
  };

  const handleButtonPressOut = () => {

    setIsButtonPressed(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperHalfBackground}></View>
      <Text style={styles.appName}>ElderPal</Text>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isButtonPressed && styles.buttonPressed]}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          onPress={() => {
            console.log('Login Pressed');
            navigation.navigate('SignIn');
          }} // Navigate to signin screen
        >
          <Text style={styles.buttonTextin}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isButtonPressed && styles.buttonPressed]}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          onPress={() => {
            console.log('SignUp Pressed');
            navigation.navigate('ChooseRole');
          }} // Navigate to SignUp screen
        >
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
    position: 'relative',
  },

  upperHalfBackground: {
    backgroundColor: '#258e25',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '50%',
    width: '100%',
    borderBottomRightRadius: 800,
  },

  appName: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    zIndex: 1,
  },

  logoContainer: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 100,
    padding: 10,
    zIndex: 1,
  },

  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },

  buttonContainer: {
    marginTop: 50,
    flexDirection: 'column',
    zIndex: 1,
  },

  button: {
    backgroundColor: '#258e25',
    borderRadius: 45,
    paddingVertical: 20,
    paddingHorizontal: 70,
    marginBottom: 15,
    opacity: 1,
    borderWidth: 2,
    borderColor: '#ffffff',
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonTextin: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },

  buttonTextup: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default App;
