import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Animated, Easing} from 'react-native';

export default function AssistantScreen() {
  const [conversationStarted, setConversationStarted] = useState(false);
  const animation = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.bezier(0.17, 0.67, 0.83, 0.67), // Custom easing function
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          easing: Easing.bezier(0.17, 0.67, 0.83, 0.67), // Custom easing function
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const stopAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const toggleConversation = () => {
    setConversationStarted(!conversationStarted);
    if (!conversationStarted) {
      startAnimation();
    } else {
      stopAnimation();
    }
  };

  const animatedStyle = {
    transform: [{scale: animation}],
  };

  return (
    <View style={styles.mainView}>
      <View>
        <Animated.Image
          source={require('../assets/assistant.png')}
          style={[{width: 300, height: 300}, animatedStyle]}
        />
      </View>
      <TouchableOpacity onPress={toggleConversation}>
        <Text style={styles.text}>
          {conversationStarted ? 'Stop Conversation' : 'Start Conversation'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 28,
    marginTop: 40,
    borderColor: '#1c5990',
    borderWidth: 5,
    padding: 10,
    borderRadius: 10,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    color: 'black',
    fontWeight: 600,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    paddingBottom: 20,
  },
};
