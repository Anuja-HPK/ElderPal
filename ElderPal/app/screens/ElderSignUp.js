import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ImageBackground, Alert, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSignUp = () => {
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
  
    if (!/^\d{6,}$/.test(elderId)) {
      Alert.alert("Error", "Invalid Elder ID. Please enter a valid ID.");
      return;
    }
  
    console.log(name, username, password, elderId);
    // Ideally, send this data to your backend server
  
    Alert.alert("Success", "Registration successful!");
  };
  
  return (
    <ImageBackground
      source={require('../assets/Elder SignUp.jpg')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
      <Text style={styles.title}>Create Account as Elder</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Your Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username</Text>
        <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="account" size={30} color="#00b33c" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainerWithIcon}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.visibilityToggle}
          >
            <MaterialCommunityIcons
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="#00b33c"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
      <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.signInPrompt}>
        <Text style={styles.signInText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => {/* Navigate to Sign Up */}}>
          <Text style={styles.signInButtonText}> Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },

  scrollViewContent: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color:  '#fff',
  },

  inputGroup: {
    marginBottom: 15,
  },

  inputContainer: {
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: '#ffffff',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
  },

  inputContainerWithIcon: {
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: '#ffffff',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  label: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
    color:  '#4dff88',
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
  },

  icon: {
    position: 'absolute',
    right: 10,
  },

  passwordInput: {
    paddingRight: 40,
  },

  visibilityToggle: {
    marginLeft: 10,
  },

  button: {
    width: '40%',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#00b33c',
    padding: 10,
    borderRadius: 30,
    marginTop: 20,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  },

  signInPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  signInText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  signInButtonText: {
    color: '#4dff88',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
