import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ElderProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.upperHalfBackground}>

      <TouchableOpacity /*onPress={() => navigation.goBack()}*/ style={styles.backButtonStyle}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Elder Profile</Text>

        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>John Doe</Text>
        <Text style={styles.infoText}>john.doe@example.com</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Edit Profile</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Appointments</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Emergency Contact</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Settings</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => {}}>
          <Text style={[styles.buttonText, styles.logoutButtonText]}>Logout</Text>
          <Text style={[styles.buttonArrow, styles.logoutButtonText]}>→</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  upperHalfBackground: {
    height: '30%',
    width: '100%',
    backgroundColor: '#258e25',
    alignItems: 'center',
    justifyContent: 'flex-end', // Aligns children to the bottom of the container
    borderBottomRightRadius: 130,
    borderBottomLeftRadius: 130,
  },

  backButtonStyle: {
    marginBottom: 80,
    marginLeft: 10,
    padding: 10,
    alignSelf: 'flex-start', // Aligns button to the left
    backgroundColor: '#ffffff',
    borderRadius: 15,
  },

  backButtonText: {
    color: '#49d049',
    fontSize: 20,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    top: 80,
  },

  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: -70,
    borderWidth: 4,
    borderColor: '#fff', // Makes the avatar stand out
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  
  infoContainer: {
    marginTop: 85, // Adjust based on avatar size and desired spacing
    alignItems: 'center', // This centers the text vertically in the container
  },

  infoText: {
    fontSize: 18,
    marginTop: -15,
    marginBottom: 20,
    color: '#000000',
    fontWeight: 'bold',
  },

  buttonContainer: {
    width: '90%', // Adjust the width of the buttons container
    alignItems: 'center', // This centers the buttons horizontally
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#49d049',
    padding: 15,
    width: '100%',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 5,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  buttonArrow: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  
  logoutButton: {
    backgroundColor: '#49d049',
  },

  logoutButtonText: {
    color: 'red',
  },
});

export default ElderProfileScreen;
