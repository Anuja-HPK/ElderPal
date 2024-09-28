import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { useState, useEffect } from 'react';

export default function ElderDashboardScreen({ navigation, userName }) {
  const [name, setName] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          setName(currentUser.displayName);

          const userKey = `elder_${currentUser.uid}`;
          const elderName = await AsyncStorage.getItem(`${userKey}_name`);

          if (elderName !== null) {
            setName(elderName);
          } else {
            console.log('Elder name not found in AsyncStorage');
          }
        }
      } catch (error) {
        console.error('Error retrieving elder data from AsyncStorage:', error.message);
      }
    };

    getUserData();
  }, []);

  return (
    <View style ={styles.main}>
    <View style={styles.topContainer}> 
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("ElderPF")}>
        <View style={styles.profTextStyle}>
          <Image
            source={require('../assets/profImage.png')} // add prof image
            style={styles.pic}
          />
          {/* Displaying user's name */}
          <Text style={styles.welcomeText}> Welcome!</Text>
        </View>
      </TouchableOpacity>
      </View>

      {/* action buttons */}
      <View style={styles.bottomContainer}> 
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AIassistant")}>
          <Text style={styles.text}>AI Assistant</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Call")}>
          <Text style={styles.text}>Call</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ToDo")}>
          <Text style={styles.text}>To-Do List</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main:{
   flex:5
  },
  topContainer:{
    flex:2
  },
  bottomContainer:{
    flex:3
  },
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
  },
  
  actionContainer: {
    marginHorizontal: wp('8%'),
    marginBottom: hp('2%'),
    marginVertical: hp('4%'),
  },
  button: {
    alignItems: 'center',
    borderRadius: wp('10%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#49d049',
  },
  text: {
    color: 'black',
    fontSize: hp('3%'),
    fontWeight: '700',
  },
  pic: {
    width: wp('28%'),
    height: hp('15%'),
    marginVertical: hp('5%'),
    marginLeft: wp('5%'),
  },
  profText: {
    fontSize: hp('3%'),
    marginLeft: wp('5%'),
    fontWeight: '600',
    color: 'black',
  },
  backButton: {
    fontSize: hp('3%'),
    marginLeft: wp('5%'),
    marginTop: hp('2%'),
    color: 'black',
  },
  profTextStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  welcomeText: {
    fontSize: 20, // You can adjust the font size as needed
    fontWeight: 'bold',
    color: 'black', // You can adjust the color as needed
    marginLeft:20
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 30, // You can adjust the font size as needed
  },
});