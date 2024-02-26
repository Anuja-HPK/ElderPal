import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignUp = () => {
    // Checking if the terms and conditions checkbox is ticked
    if (!agreeToTerms) {
      Alert.alert("Error", "You must agree to the terms and conditions to sign up.");
      return;
    }
    // Basic empty checks
    if (!name.trim() || !username.trim() || !password || !confirmPassword || !elderId.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
  
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      Alert.alert("Error", "Username must only contain letters, numbers, and underscores.");
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
  
    console.log(name, username, password, elderId);
    // Ideally, send this data to your backend server
  
    Alert.alert("Success", "Registration successful!");
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        
      <View style={styles.upperHalfBackground}></View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Create Account as Elder</Text>
        </View>
  
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName} // Assuming you have a setName function to handle this
        />
  
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail} // Assuming you have a setEmail function to handle this
        />
  
        <TextInput
          style={styles.input}
          placeholder="Create password"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword} // Assuming you have a setPassword function to handle this
        />
  
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          value={confirmPassword}
          secureTextEntry={true}
          onChangeText={setConfirmPassword} // Assuming you have a setConfirmPassword function to handle this
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
          <Text style={styles.signupButton} onPress={() => {/* navigateToSignIn() */}}>
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
    paddingTop: 20,
  },

  upperHalfBackground: {
    backgroundColor: '#258e25',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '60%',
    width: '100%',
    borderBottomRightRadius: 500,
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
    marginTop: 40,
    marginBottom: 60,
  },

  input: {
    height: 50,
    marginTop: 60,
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
    padding: 10,
    borderRadius: 15,
    marginTop: 12,
    borderWidth: 2,
    borderColor: '#ffffff',
    marginHorizontal: 20,
    width: '90%',
    marginTop: 50,
  },

  buttonText: {
    color: '#ffffff',
  },

  errorText: {
    color: 'red',
    alignSelf: 'flex-start', // Align to the start of the text input fields
    marginLeft: '5%', // Assuming the input fields have a 5% margin from the sides
    marginTop: 5,
  },

  signupText: {
    marginTop: 20,
    fontSize: 16,
  },

  signupButton: {
    fontWeight: 'bold',
    color: '#258e25',
  },

  // If you plan to use a toggle for showing/hiding password, you might need styles for that as well:
  togglePasswordVisibility: {
    position: 'absolute',
    right: 35,
    height: 50,
    width: 30,
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Adjusted styles for input to accommodate the visibility toggle icon
  input: {
    height: 50,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#258e25',
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    color: '#000000',
    paddingHorizontal: 20,
    width: '90%',
    paddingRight: 50, // Make room for the visibility toggle icon
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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

export default SignUpScreen;