import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CareTakerSignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignUp = async () => {
    if (!agreeToTerms) {
      Alert.alert("Error", "You must agree to the terms and conditions to sign up.");
      return;
    }

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const userSnapshot = await firestore().collection('users').where('email', '==', email).get();
      if (!userSnapshot.empty) {
        userSnapshot.forEach(doc => {
          const userData = doc.data();
          const userRole = userData.role;
          if (userRole !== 'caretaker') {
            throw new Error(`Email address is already associated with a ${userRole} account.`);
          }
        });
      }
    } catch (error) {
      Alert.alert("Error", error.message);
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      await firestore().collection('users').doc(userCredential.user.uid).set({
        uid: userCredential.user.uid,
        name: name,
        email: email,
        role: 'caretaker'
      });

      const userKey = `caretaker_${userCredential.user.uid}`;
      await AsyncStorage.setItem(`${userKey}_name`, name);
      await AsyncStorage.setItem(`${userKey}_email`, email);

      console.log('User account created & signed in!');

      navigation.navigate('CareTakerDB');
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          Alert.alert("Error", "That email address is already in use!");
          break;
        case 'auth/invalid-email':
          Alert.alert("Error", "That email address is invalid!");
          break;
        case 'auth/weak-password':
          Alert.alert("Error", "Password is too weak. Please use a stronger password.");
          break;
        default:
          Alert.alert("Error", "An error occurred while signing up. Please try again later.");
          console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/back.png")} // Changed to back.png
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <View style={styles.upperHalfBackground}></View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Create Account as Care Taker</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={txt => setName(txt)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={txt => setEmail(txt)}
        />

        <TextInput
          style={styles.input}
          placeholder="Create password"
          value={password}
          secureTextEntry={true}
          onChangeText={txt => setPassword(txt)}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          value={confirmPassword}
          secureTextEntry={true}
          onChangeText={txt => setConfirmPassword(txt)}
        />

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, agreeToTerms ? styles.checkboxChecked : null]}
            onPress={() => setAgreeToTerms(!agreeToTerms)}>
            {agreeToTerms && <MaterialCommunityIcons name="check" size={hp('3%')} color="#fff" />}
          </TouchableOpacity>
          <Text style={[styles.checkboxLabel, { fontSize: hp('2%') }]} onPress={() => setAgreeToTerms(!agreeToTerms)}>I agree to the Terms and Conditions</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={[styles.buttonText, { fontSize: hp('2.5%') }]}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={[styles.signupText, { fontSize: hp('2%') }]}>
          Already have an account?{' '}
          <Text style={[styles.signupButton, { fontSize: hp('2%') }]} onPress={() => navigation.navigate("SignIn")}>
            Sign In
          </Text>
        </Text>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  scrollViewContent: {
    alignItems: 'center',
    paddingTop: hp('5%'), // Adjusted to 5% of the screen height
  },

  upperHalfBackground: {
    backgroundColor: '#258e25',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '60%',
    width: '100%',
    borderBottomRightRadius: wp('30%'), // Adjusted to 30% of the screen width
  },

  headerContainer: {
    width: '100%',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: hp('4%'), // Adjusted to 4% of the screen height
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: hp('3%'), // Adjusted to 7% of the screen height
    marginBottom: hp('1%'), // Adjusted to 10% of the screen height
  },

  input: {
    height: hp('7%'), // Adjusted to 7% of the screen height
    marginTop: hp('4%'), // Adjusted to 6% of the screen height
    borderWidth: 1,
    borderColor: '#258e25',
    padding: wp('4%'),
    borderRadius: wp('10%'), // Adjusted to 10% of the screen width
    backgroundColor: '#ffffff',
    color: '#000000',
    paddingHorizontal: wp('5%'), // Adjusted to 5% of the screen width
    width: '90%',
    paddingRight: wp('15%'), // Adjusted to 15% of the screen width for the visibility toggle icon
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#258e25',
    padding: hp('2%'), // Adjusted to 2% of the screen height
    borderRadius: wp('10%'), // Adjusted to 10% of the screen width
    marginTop: hp('2%'), // Adjusted to 2% of the screen height
    borderWidth: wp('1%'), // Adjusted to 1% of the screen width
    borderColor: '#ffffff',
    marginHorizontal: wp('2%'), // Adjusted to 4% of the screen width
    width: '90%',
    marginTop: hp('4%'), // Adjusted to 6% of the screen height
  },

  buttonText: {
    color: '#ffffff',
  },

  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: wp('5%'), // Adjusted to 5% of the screen width
    marginTop: hp('1%'), // Adjusted to 1% of the screen height
  },

  signupText: {
    marginTop: hp('2%'), // Adjusted to 3% of the screen height
    fontSize: hp('2%'), // Adjusted to 2% of the screen height
  },

  signupButton: {
    fontWeight: 'bold',
    color: '#258e25',
  },

  togglePasswordVisibility: {
    position: 'absolute',
    right: wp('7%'), // Adjusted to 7% of the screen width
    height: hp('7%'), // Adjusted to 7% of the screen height
    width: wp('5%'), // Adjusted to 5% of the screen width
    top: hp('4%'), // Adjusted to 4% of the screen height
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2%'), // Adjusted to 4% of the screen height
    width: '75%',
  },

  checkbox: {
    height: hp('3%'), // Adjusted to 3% of the screen height
    width: hp('3%'), // Adjusted to 3% of the screen height
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp('0.5%'), // Adjusted to 0.5% of the screen width
    borderColor: '#258e25',
    borderRadius: wp('2%'), // Adjusted to 2% of the screen width
    marginRight: wp('4%'), // Adjusted to 4% of the screen width
  },

  checkboxChecked: {
    backgroundColor: '#258e25',
  },

  checkboxLabel: {
    flex: 1,
    fontSize: hp('2%'), // Adjusted to 2% of the screen height
  },
  backButton: {
    position: 'absolute',
    top: hp('2%'), // Adjusted to 2% of the screen height
    left: wp('2%'), // Adjusted to 2% of the screen width
    zIndex: 1,
  },

  backIcon: {
    width: wp('8%'), // Adjust according to your icon size preference
    height: wp('8%'), // Adjust according to your icon size preference
    tintColor: 'white', // Assuming your icon color is black
  },
});

export default CareTakerSignUpScreen;
