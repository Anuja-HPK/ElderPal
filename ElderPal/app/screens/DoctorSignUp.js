import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, ScrollView, Dimensions, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DoctorSignUpScreen = ({ navigation }) => {
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

    try {
      const userSnapshot = await firestore().collection('users').where('email', '==', email).get();
      if (!userSnapshot.empty) {
        userSnapshot.forEach(doc => {
          const userData = doc.data();
          const userRole = userData.role;
          if (userRole !== 'doctor') { // Change 'elder' to the appropriate role you're signing up for
            throw new Error(`Email address is already associated with a ${userRole} account.`);
          }
        });
      }
    } catch (error) {
      Alert.alert("Error", error.message);
      return;
    }

    try {
      // Create user in Firebase authentication
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      // Set display name for the user
      await userCredential.user.updateProfile({
        displayName: name,
      });

      // Save additional user data to Firestore
      await firestore().collection('users').doc(userCredential.user.uid).set({
        uid: userCredential.user.uid,
        name: name,
        email: email,
        role: 'doctor'
        // Add more fields if needed
      });

      // Generate a unique key using the Firebase user ID
      const userKey = `doctor_${userCredential.user.uid}`;

      // Save user details using the generated unique key
      await AsyncStorage.setItem(`${userKey}_name`, name);
      await AsyncStorage.setItem(`${userKey}_email`, email);

      console.log('User account created & signed in!');

      navigation.navigate('DoctorDB');

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
          <Text style={styles.headerTitle}>Create Account as Doctor</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={txt => setName(txt)} // Assuming you have a setName function to handle this
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={txt => setEmail(txt)} // Assuming you have a setEmail function to handle this
        />

        <TextInput
          style={styles.input}
          placeholder="Create password"
          value={password}
          secureTextEntry={true}
          onChangeText={txt => setPassword(txt)} // Assuming you have a setPassword function to handle this
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          value={confirmPassword}
          secureTextEntry={true}
          onChangeText={txt => setConfirmPassword(txt)} // Assuming you have a setConfirmPassword function to handle this
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
    borderBottomRightRadius: wp('100%'),
  },

  headerContainer: {
    width: '100%',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: hp('3%'), //
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },

  input: {
    height: hp('6%'),
    marginTop: hp('4%'),
    borderWidth: 1,
    borderColor: '#258e25',
    padding: wp('3%'),
    borderRadius: hp('2%'),
    backgroundColor: '#ffffff',
    color: '#000000',
    paddingHorizontal: wp('5%'),
    width: wp('90%'),
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#258e25',
    padding: wp('4%'),
    borderRadius: hp('5%'),
    marginTop: hp('4%'),
    borderWidth: wp('0.5%'),
    borderColor: '#ffffff',
    marginHorizontal: wp('5%'),
    width: wp('90%'),
    marginBottom: hp('1%'),
  },

  buttonText: {
    color: '#ffffff',
  },

  errorText: {
    color: 'red',
    alignSelf: 'flex-start', // Align to the start of the text input fields
    marginLeft: wp('5%'), // Assuming the input fields have a 5% margin from the sides
    marginTop: hp('1%'),
  },

  signupText: {
    marginTop: hp('5%'),
    fontSize: hp('2%'),
  },

  signupButton: {
    fontWeight: 'bold',
    color: '#258e25',
  },

  // If you plan to use a toggle for showing/hiding password, you might need styles for that as well:
  togglePasswordVisibility: {
    position: 'absolute',
    right: wp('8%'),
    height: hp('7%'),
    width: wp('6%'),
    top: hp('1.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Adjusted styles for input to accommodate the visibility toggle icon
  input: {
    height: hp('7%'),
    marginTop: hp('5%'),
    borderWidth: 1,
    borderColor: '#258e25',
    padding: wp('3%'),
    borderRadius: hp('5%'),
    backgroundColor: '#ffffff',
    color: '#000000',
    paddingHorizontal: wp('13%'),
    width: wp('90%'),
    paddingRight: wp('20%'), // Make room for the visibility toggle icon
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('5%'),
    width: wp('75%'),
  },

  checkbox: {
    height: hp('3%'),
    width: hp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp('0.5%'),
    borderColor: '#258e25',
    borderRadius: hp('1%'),
    marginRight: wp('3%'),
  },

  checkboxChecked: {
    backgroundColor: '#258e25',
  },

  checkboxLabel: {
    flex: 1, // Ensure label takes up the remaining space
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
    tintColor: 'black',
  },
});

export default DoctorSignUpScreen;
