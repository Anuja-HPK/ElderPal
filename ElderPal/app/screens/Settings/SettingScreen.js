import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Import firestore

const SettingScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields.');
      return;
    }
    if (newPassword === confirmPassword) {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const credential = auth.EmailAuthProvider.credential(currentUser.email, oldPassword);
          await currentUser.reauthenticateWithCredential(credential);
          await currentUser.updatePassword(newPassword);
          console.log('Password changed successfully');
          // Update password in the database (if applicable)
          // Example: firestore().collection('users').doc(currentUser.uid).update({ password: newPassword });
        } else {
          console.log('No user is currently signed in.');
        }
      } catch (error) {
        console.error('Password change error:', error);
        // Show an error message to the user
      }
    } else {
      Alert.alert('Error', 'Passwords do not match.');
    }
  };

  const handleChangeCountry = () => {
    if (!country) {
      Alert.alert('Error', 'Please enter a country.');
      return;
    }
    // Implement country change functionality
    console.log('Country changed to:', country);
    // Update country in the database (if applicable)
    // Example: firestore().collection('users').doc(currentUser.uid).update({ country: country });
  };

  const handleChangeEmail = async () => {
    if (!newEmail || !oldPassword) {
      Alert.alert('Error', 'Please fill in all email fields.');
      return;
    }
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const credential = auth.EmailAuthProvider.credential(currentUser.email, oldPassword);
        await currentUser.reauthenticateWithCredential(credential);
        await currentUser.updateEmail(newEmail);
        console.log('Email changed successfully');
        // Update email in the database (if applicable)
        // Example: firestore().collection('users').doc(currentUser.uid).update({ email: newEmail });
      } else {
        console.log('No user is currently signed in.');
      }
    } catch (error) {
      console.error('Email change error:', error);
      // Show an error message to the user
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={[styles.heading, styles.greenColor]}>Change Password</Text>
      {/* Password change inputs and button */}
      <TextInput
        style={[styles.input, styles.roundedInput]}
        placeholder="Old Password"
        secureTextEntry={true}
        value={oldPassword}
        onChangeText={text => setOldPassword(text)}
      />
      <TextInput
        style={[styles.input, styles.roundedInput]}
        placeholder="New Password"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
      />
      <TextInput
        style={[styles.input, styles.roundedInput]}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <Text style={[styles.heading, styles.greenColor]}>Change Email</Text>
      {/* Email change inputs and button */}
      <TextInput
        style={[styles.input, styles.roundedInput]}
        placeholder="New Email"
        value={newEmail}
        onChangeText={text => setNewEmail(text)}
      />
      <TextInput
        style={[styles.input, styles.roundedInput]}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={oldPassword} // Reusing oldPassword state for reauthentication
        onChangeText={text => setOldPassword(text)}
      />
      <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={handleChangeEmail}>
        <Text style={styles.buttonText}>Change Email</Text>
      </TouchableOpacity>

      <Text style={[styles.heading, styles.greenColor]}>Change Country</Text>
      {/* Country change inputs and button */}
      <TextInput
        style={[styles.input, styles.roundedInput]}
        placeholder="Enter your new country"
        value={country}
        onChangeText={text => setCountry(text)}
      />
      <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={handleChangeCountry}>
        <Text style={styles.buttonText}>Change Country</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff', // Light green background color
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: '#4caf50', // Green button color
    borderRadius: 10,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000', // Black border color
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  roundedInput: {
    borderRadius: 20, // Make input text box curved
  },
  button: {
    backgroundColor: '#4caf50', // Green button color
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  greenButton: {
    backgroundColor: '#4caf50', // Green button color
  },
  greenColor: {
    color: '#4caf50', // Green text color
  },
});

export default SettingScreen;