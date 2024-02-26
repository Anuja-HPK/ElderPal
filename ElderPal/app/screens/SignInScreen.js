import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SignInScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignIn = () => {
    let error = false;
    // Reset errors
    setUsernameError('');
    setPasswordError('');

    if (!username.trim()) {
      setUsernameError('Email/username is required');
      error = true;
    }
    if (!password.trim()) {
      setPasswordError('Password is required');
      error = true;
    }

    if (!error) {
      // Handle sign in
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.upperHalfBackground}></View>

        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Sign In</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter your email/username"
          value={username}
          onChangeText={text => {
            setUsername(text);
            if (text.trim()) setUsernameError('');
          }}
        />
        {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          secureTextEntry={true}
          onChangeText={text => {
            setPassword(text);
            if (text.trim()) setPasswordError('');
          }}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TouchableOpacity onPress={() => {/* Handle forgot password */}} style={{ width: '90%', alignItems: 'flex-end' }}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text style={styles.signupButton} onPress={() => {/* Navigate to sign up */}}>
            Sign Up
          </Text>
        </Text>

        <Text style={styles.orText}>-----------------------------OR-----------------------------</Text>

        <TouchableOpacity style={styles.socialButton} onPress={() => {/* Handle Google sign-in */}}>
          <MaterialCommunityIcons name="google" size={20} color="#DB4437" />
          <Text style={styles.socialButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={() => {/* Handle Apple sign-in */}}>
          <MaterialCommunityIcons name="apple" size={20} color="#000" />
          <Text style={styles.socialButtonText}>Sign in with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={() => {/* Handle Facebook sign-in */}}>
          <MaterialCommunityIcons name="facebook" size={20} color="#3b5998" />
          <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
        </TouchableOpacity>
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

  errorText: {
    color: 'red',
    width: '90%',
    textAlign: 'left',
  },

  headerContainer: {
    width: '100%',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 60,
  },

  input: {
    height: 50,
    marginTop: 20,
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
  },

  buttonText: {
    color: '#ffffff',
  },

  forgotPasswordText: {
    color: '#49d049',
    alignSelf: 'flex-end',
    marginBottom: 12,
    fontWeight: 'bold',
  },

  signupText: {
    marginTop: 12,
    textAlign: 'center',
    color: '#000000',
  },

  signupButton: {
    color: '#49d049',
    fontWeight: 'bold',
  },

  orText: {
    textAlign: 'center',
    marginVertical: 12,
    color: '#000000',
    fontWeight: 'bold',
  },

  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#258e25',
    width: '90%',
  },

  socialButtonText: {
    marginLeft: 10,
    color: '#000000',
  },
});

export default SignInScreen;