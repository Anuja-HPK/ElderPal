import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { auth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = ({  }) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignIn = () => {
    // Reset errors
    setUsernameError('');
    setPasswordError('');

    if (!username.trim()) {
      setUsernameError('Email/username is required');
      return;
    }
    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }

    auth()
      .signInWithEmailAndPassword(username, password)
      .then(async (userCredential) => {
        // Get user data from firestore based on their UID
        const userData = await firestore().collection('users').doc(userCredential.user.uid).get();
        const role = userData.data().role;
        const userEmail = userData.data().email;

        //compare user role and email
        if (role === 'elder' && userEmail === username) {
          // Navigate to ElderHomeScreen
          navigation.navigate('ElderDB');
          console.log("Successfully signed in as an elder!");
          Alert.alert('User logged in');

        } else if (role === 'doctor' && userEmail === username) {
          // Navigate to DoctorHomeScreen
          navigation.navigate('DoctorDB');
          console.log("Successfully signed in as a doctor!");
          Alert.alert('User logged in');

        } else if (role === 'familyMember' && userEmail === username) {
          // Navigate to FamilyMemberHomeScreen
          navigation.navigate('FamilyMemberDB');
          console.log("Successfully signed in as a family member!");
          Alert.alert('User logged in');

        } else if (role === 'caretaker' && userEmail === username) {
          // Navigate to CaretakerHomeScreen
          navigation.navigate('CaretakerDB');
          console.log("Successfully signed in as a caretaker!");
          Alert.alert('User logged in');

        } else {
          // Navigate to a default screen if role or email doesn't match
          navigation.navigate('SignIn');
          console.log("Unknown user role or invalid email!");
          Alert.alert('Error', 'Unknown user role or invalid email');
        }
      })

      .catch(error => {
        console.log(error.code);
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            // Handle incorrect username/email or password
            setUsernameError('Invalid username/email or password');
            setPasswordError('Invalid username/email or password');
            break;
          case 'auth/invalid-email':
            // Handle invalid email
            setUsernameError('Invalid email');
            break;
          default:
            // Handle other errors
            Alert.alert('Error', 'An error occurred. Please try again later.');
            console.error(error);
        }
      });
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

        <TouchableOpacity onPress={() => {/* Handle forgot password */ }} style={{ width: '90%', alignItems: 'flex-end' }}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an account?{' '}

          <Text style={styles.signupButton} onPress={() => navigation.navigate("ChooseRole")}>
            Sign Up
          </Text>
        </Text>

        <Text style={styles.orText}>-----------------------------OR-----------------------------</Text>

        <TouchableOpacity style={styles.socialButton} onPress={() => {/* Handle Google sign-in */ }}>
          <Image
            source={require('../assets/GoogleIcon.jpg')}
            style={{ width: 20, height: 20, marginRight: 8 }}
          />
          <Text style={styles.socialButtonText}>SignIn with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={() => {/* Handle Apple sign-in */ }}>
          <Image
            source={require('../assets/Instagram.jpg')}
            style={{ width: 20, height: 20, marginRight: 8 }}
          />
          <Text style={styles.socialButtonText}>SignIn with Instagram</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={() => {/* Handle Facebook sign-in */ }}>
          <Image
            source={require('../assets/facebook.jpg')}
            style={{ width: 25, height: 20, marginRight: 8 }}
          />
          <Text style={styles.socialButtonText}>SignIn with Facebook</Text>
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
    padding: 15,
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