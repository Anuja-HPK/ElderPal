import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Features = () => {
  const animatedValues = useRef(Array.from({ length: 21 }, () => new Animated.Value(0))).current;
  const fadeOutAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    animateText();
  }, []);

  const animateText = () => {
    const animations = animatedValues.map((value, index) => (
      Animated.timing(value, {
        toValue: 1,
        duration: 300,
        delay: index * 100, // Delay each letter's animation
        useNativeDriver: true,
      })
    ));

    const sequence = Animated.sequence([
      Animated.stagger(100, animations),
      Animated.delay(2000), // Delay after fully appearing
      Animated.timing(fadeOutAnimation, {
        toValue: 0,
        duration: 500, // Fade out duration
        useNativeDriver: true,
      }),
      Animated.timing(fadeOutAnimation, {
        toValue: 1,
        duration: 1, // Reset fade out animation duration
        useNativeDriver: true,
      })
    ]);

    Animated.loop(
      Animated.sequence([
        sequence,
        Animated.delay(3000) // Delay before restarting loop
      ])
    ).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi, I'm your AI Pal!</Text>

      <View style={styles.featureContainer}>
        <View style={styles.featureItem}>
          <Image
            source={require('../assets/vaimages/smartaiIcon.png')}
            style={styles.featureIcon}
          />
          <Text style={styles.featureText}>ElderPal AI Assistant</Text>
        </View>
        <Text style={styles.featureDescription}>
          A powerful voice assistant with the ability to assist you with anything!!
        </Text>
      </View>
      <View style={styles.textMove}>
        {Array.from("What's on your mind?").map((letter, index) => (
          <Animated.Text key={index} style={[styles.text, { opacity: animatedValues[index] }]}>
            {letter}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(60),
    paddingVertical: hp(2),
  },
  title: {
    textAlign: 'center',
    fontSize: wp(6.5),
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: hp(2),
  },
  featureContainer: {
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
    padding: wp(4),
    borderRadius: wp(2),
    marginTop: hp(2),
    marginBottom: hp(2),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  featureIcon: {
    height: hp(4),
    width: hp(4),
  },
  featureText: {
    fontSize: wp(4.8),
    fontWeight: 'bold',
    marginLeft: wp(2),
    color: 'gray',
  },
  featureDescription: {
    fontSize: wp(3.8),
    color: 'gray',
    fontWeight: '500',
  },
  textMove: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(20),
    marginBottom: hp(2),
  },
  text: {
    fontSize: wp(6.5),
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default Features;
