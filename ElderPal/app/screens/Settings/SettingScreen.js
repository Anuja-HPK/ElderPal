import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext'; // Adjust the path as necessary

const SettingScreen = ({ navigation }) => { // Assuming you're using React Navigation
  const { theme, toggleTheme } = useTheme();

  const backgroundStyle = {
    backgroundColor: theme === 'light' ? '#ffffff' : '#000000',
  };

  const textStyle = {
    color: theme === 'light' ? '#000000' : '#ffffff',
  };

  return (
    <View style={[styles.container, backgroundStyle]}>

      <TouchableOpacity /*onPress={() => navigation.goBack()}*/ style={styles.backButton}>
        <Text style={[styles.backButtonText, textStyle]}>Back</Text>
      </TouchableOpacity>

      <Text style={[styles.text, textStyle]}>Settings</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={toggleTheme} style={[styles.button, {backgroundColor: '#49d049'}]}>
          <Text style={[styles.buttonText, textStyle]}>Change the color mode</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Help')} style={[styles.button, {backgroundColor: '#49d049'}]}>
          <Text style={[styles.buttonText, textStyle]}>Help</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },

  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#49d049',
    marginTop: 20,
  },

  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  text: {
    fontSize: 40,
    marginBottom: 50,
    marginTop: 40,
    fontWeight: 'bold',
  },

  buttonsContainer: {
    width: '90%',
    alignItems: 'center',
  },

  button: {
    width: '100%',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#49d049',
    height: 50,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingScreen;
