import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }
    ).start();

    const timer = setTimeout(() => {
      navigation.navigate('SignIn'); // Make sure this matches the name you've given the SignInScreen in your navigation stack
    }, 3000); // Navigate after 3 seconds

    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.upperHalfBackground}></View>
      <Animated.View style={{...styles.logoContainer, opacity: fadeAnim}}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
        />
      </Animated.View>
      <Animated.View style={{opacity: fadeAnim}}>
        <Text style={styles.title}>Welcome to ElderPal</Text>
        <Text style={styles.description}>
          Stay connected, supported, and informed with all your elder care needs in one place.
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 40,
  },
  description: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: 'bold',
  },

  upperHalfBackground: {
    backgroundColor: '#258e25',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '55%',
    borderBottomRightRadius: 200,
    borderBottomLeftRadius: 200,
    zIndex: -1,
  },
});

export default WelcomeScreen;