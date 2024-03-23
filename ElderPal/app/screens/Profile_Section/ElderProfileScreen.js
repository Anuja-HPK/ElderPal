import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'; // Importing hp and wp

const ElderProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      try {
        const userKey = `elder_${userCredential.user.uid}`;
        const elderName = await AsyncStorage.getItem(`${userKey}_name`);
        const elderEmail = await AsyncStorage.getItem(`${userKey}_email`);
        const elderUid = await AsyncStorage.getItem(`${userKey}_uid`);

        if (elderName !== null && elderEmail !== null) {
          setName(elderName);
          setEmail(elderEmail);
          setUid(elderUid);
        } else {
          console.log('Elder details not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error retrieving elder data from AsyncStorage:', error.message);
      }
    };

    getData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignInScreen' }],
      });
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Logout Failed', 'An error occurred while logging out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperHalfBackground}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Elder Profile</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{name}</Text>
        <Text style={styles.infoText}>{email}</Text>
        <Text style={styles.infoText}>UID: {uid}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ElderEdit')}>
          <Text style={styles.buttonText}>Edit Profile</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.buttonText}>Appointments</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.buttonText}>Emergency Contact</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("settings")}>
          <Text style={styles.buttonText}>Settings</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Text style={[styles.buttonText, styles.logoutButtonText]}>Logout</Text>
          <Text style={[styles.buttonArrow, styles.logoutButtonText]}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  upperHalfBackground: {
    height: hp('30%'),
    width: '100%',
    backgroundColor: '#258e25',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomRightRadius: wp('20%'), // Adjusted radius
    borderBottomLeftRadius: wp('20%'), // Adjusted radius
  },

  backButton: {
    position: 'absolute',
    top: hp('2%'),
    left: wp('2%'),
    zIndex: 1,
  },

  backIcon: {
    width: wp('8%'),
    height: wp('8%'),
    tintColor: 'white',
  },

  title: {
    fontSize: hp('3.5%'), // Adjusted fontSize
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    top: hp('10%'), // Adjusted top position
  },
  avatar: {
    width: wp('30%'), // Adjusted width
    height: wp('30%'), // Adjusted height
    borderRadius: wp('15%'), // Adjusted borderRadius
    marginBottom: -hp('4%'), // Adjusted marginBottom
    borderWidth: wp('2%'), // Adjusted borderWidth
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: wp('4%'), // Adjusted shadowRadius
  },

  infoContainer: {
    marginTop: hp('8%'), // Adjusted marginTop
    alignItems: 'center',
  },

  infoText: {
    fontSize: hp('2.2%'), // Adjusted fontSize
    marginTop: -hp('2%'), // Adjusted marginTop
    marginBottom: hp('2%'), // Adjusted marginBottom
    color: '#000000',
    fontWeight: 'bold',
  },

  buttonContainer: {
    width: wp('90%'), // Adjusted width
    alignItems: 'center',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#49d049',
    paddingVertical: hp('2%'), // Adjusted paddingVertical
    paddingHorizontal: wp('5%'), // Adjusted paddingHorizontal
    width: wp('90%'), // Adjusted width
    borderRadius: wp('5%'), // Adjusted borderRadius
    marginTop: hp('2%'), // Adjusted marginTop
    marginBottom: hp('1%'), // Adjusted marginBottom
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('2%'), // Adjusted fontSize
  },

  buttonArrow: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: hp('2.5%'), // Adjusted fontSize
  },

  logoutButton: {
    backgroundColor: '#49d049',
  },

  logoutButtonText: {
    color: 'red',
  },
});

export default ElderProfileScreen;

