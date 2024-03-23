import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Import responsive screen utilities

const ElderSignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignUp = async () => {
    // Checking if the terms and conditions checkbox is ticked
    if (!agreeToTerms) {
      Alert.alert("Error", "You must agree to the terms and conditions to sign up.");
      return;
    }

    // Basic empty checks
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    // Password length check
    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long.");
      return;
    }

    // Passwords match check
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Check if the email is already associated with a user account in Firestore
    try {
      const userSnapshot = await firestore().collection('users').where('email', '==', email).get();
      if (!userSnapshot.empty) {
        userSnapshot.forEach(doc => {
          const userData = doc.data();
          const userRole = userData.role;
          if (userRole !== 'elder') { // Change 'elder' to the appropriate role you're signing up for
            throw new Error(`Email address is already associated with a ${userRole} account.`);
          }
        });
      }
    } catch (error) {
      Alert.alert("Error", error.message);
      return;
    }

    // Firebase authentication
    try {
      // Create user in Firebase authentication
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      // Save additional user data to Firestore
      await firestore().collection('users').doc(userCredential.user.uid).set({
        uid: userCredential.user.uid,
        name: name,
        email: email,
        role: 'elder'
        // Add more fields if needed
      });

      // Generate a unique key using the Firebase user ID
      const userKey = `elder_${userCredential.user.uid}`;

      // Save user details using the generated unique key
      await AsyncStorage.setItem(`${userKey}_name`, name);
      await AsyncStorage.setItem(`${userKey}_email`, email);

      console.log('User account created & signed in!');

      navigation.navigate('ElderDB');

      // Handle navigation to the appropriate screen here
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
          <Text style={styles.headerTitle}>Create Account as Elder</Text>
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
            {agreeToTerms && <MaterialCommunityIcons name="check" size={20} color="#fff" />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel} onPress={() => setAgreeToTerms(!agreeToTerms)}>I agree to the Terms and Conditions</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Already have an account?{' '}
          {/* Uncomment and implement navigation logic within onPress when ready */}
          <Text style={styles.signupButton} onPress={() => navigation.navigate("SignIn")}>
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
    paddingTop: hp('2%'),
  },

  upperHalfBackground: {
    backgroundColor: '#258e25',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: hp('60%'),
    width: '100%',
    borderBottomRightRadius: 600,
  },

  headerContainer: {
    width: '100%',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: hp('5%'),
    marginBottom: hp('2%'),
  },

  input: {
    height: hp('6%'),
    marginTop: hp('5%'),
    borderWidth: 1,
    borderColor: '#258e25',
    padding: hp('1%'),
    borderRadius: hp('4%'),
    backgroundColor: '#ffffff',
    color: '#000000',
    paddingHorizontal: wp('5%'),
    width: wp('90%'),
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#258e25',
    padding: hp('1.5%'),
    borderRadius: hp('4%'),
    marginTop: hp('4%'),
    borderWidth: 2,
    borderColor: '#ffffff',
    marginHorizontal: wp('5%'),
    width: wp('90%'),
  },

  buttonText: {
    color: '#ffffff',
  },

  signupText: {
    marginTop: hp('4%'),
    fontSize: hp('2%'),
  },

  signupButton: {
    fontWeight: 'bold',
    color: '#258e25',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('3%'),
    width: wp('75%'),
  },

  checkbox: {
    height: hp('2.5%'),
    width: hp('2.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#258e25',
    borderRadius: hp('0.5%'),
    marginRight: wp('3%'),
  },

  checkboxChecked: {
    backgroundColor: '#258e25',
  },

  checkboxLabel: {
    flex: 1,
    fontSize: hp('2%'),
  },
  backButton: {
    position: 'absolute',
    top: hp('2%'), // Adjusted to 2% of the screen height
    left: wp('2%'), // Adjusted to 2% of the screen width
    zIndex: 1,
  },

  backIcon: {
    width: wp('8%'),
    height: wp('8%'),
    tintColor: 'white',
  },


});

export default ElderSignUpScreen;

