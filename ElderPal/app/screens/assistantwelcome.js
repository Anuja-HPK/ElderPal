import React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const assistantwelcome = () =>{
    <SafeAreaView style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.title}>ElderPal Assistant</Text>
      <Text style={styles.subtitle}>Ask me anything!</Text>
    </View>
    <View style={styles.imageContainer}>
      <Image
        source={require('../../assets/images/welcome.png')}
        style={styles.image}
      />
    </View>

}

export default WelcomeScreen;
