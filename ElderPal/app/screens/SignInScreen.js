import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const wp = percentage => {
  return (percentage * screenWidth) / 100;
};

const hp = percentage => {
  return (percentage * screenHeight) / 100;
};

const SignInScreen = ({ }) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignIn = () => {
        //compare user role and email
        if (password === 'elder' ) {
          // Navigate to ElderHomeScreen
          navigation.navigate('ElderDB');


        } else if (password === 'doctor' ) {
          // Navigate to DoctorHomeScreen
          navigation.navigate('DoctorDB');


        } else if (password === 'family' ) {
          // Navigate to FamilyMemberHomeScreen
          navigation.navigate('FamilyMemberDB');


        } else if (password === 'care' ) {
          // Navigate to CaretakerHomeScreen
          navigation.navigate('CareTakerDB');


        } else {
          // Navigate to a default screen if role or email doesn't match
          navigation.navigate('SignIn');
          Alert.alert('Error', 'Unknown user role or invalid email');
        }
        // use these as password => elder , doctor,  care , family
      
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.upperHalfBackground, { height: hp(58) }]}></View>

        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Log In</Text>
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

        <TouchableOpacity onPress={() => {/* Handle forgot password */ }} style={{ width: wp(90), alignItems: 'flex-end' }}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Log In</Text>
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
            style={{ width: wp(5), height: wp(5), marginRight: wp(1.5) }}
          />
          <Text style={styles.socialButtonText}>SignIn with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={() => {/* Handle Apple sign-in */ }}>
          <Image
            source={require('../assets/Instagram.jpg')}
            style={{ width: wp(5), height: wp(5), marginRight: wp(1.5) }}
          />
          <Text style={styles.socialButtonText}>SignIn with Instagram</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={() => {/* Handle Facebook sign-in */ }}>
          <Image
            source={require('../assets/facebook.jpg')}
            style={{ width: wp(6.25), height: wp(5), marginRight: wp(1.5) }}
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
    paddingTop: hp(2.5),
  },

  upperHalfBackground: {
    backgroundColor: '#258e25',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    borderBottomRightRadius: wp(450),


  },

  errorText: {
    color: 'red',
    width: wp(90),
    textAlign: 'left',
  },

  headerContainer: {
    width: '100%',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: hp(6.5),
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: hp(5),
    marginBottom: hp(7),
  },

  input: {
    height: hp(6),
    marginTop: hp(4),
    borderWidth: wp(0.5),
    borderColor: '#258e25',
    padding: wp(2),
    borderRadius: wp(3),
    backgroundColor: '#ffffff',
    color: '#000000',
    paddingHorizontal: wp(5),
    width: wp(90),
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#258e25',
    padding: hp(1.5),
    borderRadius: wp(3),
    marginTop: hp(2),
    borderWidth: wp(0.5),
    borderColor: '#ffffff',
    marginHorizontal: wp(5),
    width: wp(90),
  },

  buttonText: {
    color: '#ffffff',
  },

  forgotPasswordText: {
    color: '#49d049',
    alignSelf: 'flex-end',
    marginBottom: hp(1.5),
    fontWeight: 'bold',
  },

  signupText: {
    marginTop: hp(2),
    textAlign: 'center',
    color: '#000000',
  },

  signupButton: {
    color: '#49d049',
    fontWeight: 'bold',
  },

  orText: {
    textAlign: 'center',
    marginVertical: hp(1.5),
    color: '#000000',
    fontWeight: 'bold',
  },

  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: hp(1.5),
    borderRadius: wp(3),
    marginBottom: hp(2),
    borderWidth: wp(0.5),
    borderColor: '#258e25',
    width: wp(90),
  },

  socialButtonText: {
    marginLeft: wp(4),
    color: '#000000',
  },
});

export default SignInScreen;
