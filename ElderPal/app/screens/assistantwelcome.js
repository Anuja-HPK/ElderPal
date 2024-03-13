import React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const assistantwelcome = () =>{
    const navigation = useNavigation();
    return(
    <SafeAeaView style={styles.container}>
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
    <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  textContainer: {
    marginBottom: hp(2),
  },
  title: {
    fontSize: wp(10),
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'gray',
  },
  subtitle: {
    fontSize: wp(4),
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 1,
    color: 'gray',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: wp(75),
    height: wp(75),
  },
  button: {
    backgroundColor: '#059669',
    marginHorizontal: wp(5),
    padding: hp(2),
    borderRadius: wp(2),
  },
  buttonText: {
    fontSize: wp(6),
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});


export default WelcomeScreen;
