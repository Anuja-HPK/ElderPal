import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1, // Fade in to full opacity
        duration: 4000, // Duration of the animation
        useNativeDriver: true, // Use native driver for better performance
      }
    ).start();

    const timer = setTimeout(() => {
      /*navigation.navigate('SignInScreen'); */// Make sure this matches the name you've given the SignInScreen in your navigation stack
    }, 3000); // Navigate after 3 seconds

    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{...styles.logoContainer, opacity: fadeAnim}}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
        />
      </Animated.View>
      <Animated.View style={{opacity: fadeAnim}}>
        <Text style={styles.tittle}>Welcome to ElderPal</Text>
        <Text style={styles.description}>
        Your companion for elder care management. Stay connected, supported, and informed with all your elder care needs in one place.
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
      backgroundColor: '#4dff88',
    },
    logo: {
      width: 160,
      height: 160,
      marginBottom: 20,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    tittle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 50,
        paddingHorizontal: 20,
    }
});
  
export default WelcomeScreen;