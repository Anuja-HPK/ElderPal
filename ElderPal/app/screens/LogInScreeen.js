import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const wp = percentage => {
  return (percentage * screenWidth) / 100;
};

const hp = percentage => {
  return (percentage * screenHeight) / 100;
};

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
      <View style={[styles.upperHalfBackground, { height: hp(50) }]}></View>
      <Text style={styles.appName}>ElderPal</Text>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
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
    width: '100%',
    borderBottomRightRadius: wp(100),
  },

  appName: {
    fontSize: hp(5),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: hp(3),
    zIndex: 1,
  },

  logoContainer: {
    alignItems: 'center',
    borderWidth: wp(0.5),
    borderColor: 'gray',
    borderRadius: wp(80),
    padding: wp(1),
    zIndex: 1,
  },

  logo: {
    width: wp(60),
    height: wp(60),
    resizeMode: 'contain',
  },

  buttonContainer: {
    marginTop: hp(5),
    flexDirection: 'column',
    zIndex: 1,
  },

  button: {
    backgroundColor: '#258e25',
    borderRadius: wp(10),
    paddingVertical: hp(2),
    paddingHorizontal: wp(15),
    marginBottom: hp(2),
    opacity: 1,
    borderWidth: wp(1),
    borderColor: '#ffffff',
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonTextin: {
    color: '#fff',
    fontSize: hp(3.5),
    fontWeight: 'bold',
  },

  buttonTextup: {
    color: 'black',
    fontSize: hp(3.5),
    fontWeight: 'bold',
  },
});

export default App;
