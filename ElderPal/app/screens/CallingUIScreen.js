import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Image, Animated} from 'react-native';

export default function CallingUIScreen() {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  };

  const backgroundColorInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#595959', '#8a8a8a'], // colors that change
  });

  const animatedStyle = {
    backgroundColor: backgroundColorInterpolate,
  };

  return (
    <Animated.View style={[{flex: 1, alignItems: 'center'}, animatedStyle]}>
      <Text style={{fontSize: 23, marginTop: 40}}>Calling...</Text>
      <Text style={{fontSize: 45, marginTop: 90}}>Son</Text>
      <Image
        source={require('../assets/profImage.png')} // add contact image
        style={{marginTop: 10}}
      />
      <Text style={{fontSize: 30, marginTop: 10}}>Mobile: 0781234567</Text>
    </Animated.View>
  );
}
