import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, ScrollView, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const FamilyMemberSignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState('');

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
          if (userRole !== 'family member') { // Change 'elder' to the appropriate role you're signing up for
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
        role: 'familyMember'
        // Add more fields if needed
      });

      // Generate a unique key using the Firebase user ID
      const userKey = `familyMember_${userCredential.user.uid}`;

      // Save user details using the generated unique key
      await AsyncStorage.setItem(`${userKey}_name`, name);
      await AsyncStorage.setItem(`${userKey}_email`, email);

      console.log('User account created & signed in!');

      navigation.navigate('familyMemberDB');

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

        <View style={styles.upperHalfBackground}></View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Create Account as Family Member</Text>
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
    paddingTop: screenHeight * 0.05, // Adjust according to screen height
  },

  upperHalfBackground: {
    backgroundColor: '#258e25',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '60%',
    width: '100%',
    borderBottomRightRadius: screenHeight * 3, // Adjust according to screen height
  },

  headerContainer: {
    width: '100%',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: screenHeight * 0
  },

  input: {
    height: screenHeight * 0.065, // Adjust according to screen height
    marginTop: screenHeight * 0.06, // Adjust according to screen height
    borderWidth: 1,
    borderColor: '#258e25',
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    color: '#000000',
    paddingHorizontal: 20,
    width: '90%',
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#258e25',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: screenHeight * 0.05, // Adjust according to screen height
    borderWidth: 2,
    borderColor: '#ffffff',
    marginHorizontal: screenWidth * 0.05, // Adjust according to screen width
    width: '90%',
  },

  buttonText: {
    color: '#ffffff',
  },

  errorText: {
    color: 'red',
    alignSelf: 'flex-start', // Align to the start of the text input fields
    marginLeft: '5%', // Assuming the input fields have a 5% margin from the sides
    marginTop: screenHeight * 0.01, // Adjust according to screen height
  },

  signupText: {
    marginTop: screenHeight * 0.02, // Adjust according to screen height
    fontSize: 16,
  },

  signupButton: {
    fontWeight: 'bold',
    color: '#258e25',
  },

  togglePasswordVisibility: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: screenWidth * 0.03, // Adjust according to screen width
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenHeight * 0.025, // Adjust according to screen height
    width: '75%',
  },

  checkbox: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#258e25',
    borderRadius: 5,
    marginRight: 10,
  },

  checkboxChecked: {
    backgroundColor: '#258e25',
  },

  checkboxLabel: {
    flex: 1, // Ensure label takes up the remaining space
    fontSize: 16,
  },
});

export default FamilyMemberSignUpScreen;
