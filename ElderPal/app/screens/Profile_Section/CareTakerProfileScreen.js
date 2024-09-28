import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import auth from '@react-native-firebase/auth';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {launchImageLibrary} from 'react-native-image-picker';
import {launchCamera} from 'react-native-image-picker';

const CareTakerProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          setName(currentUser.displayName);
          setEmail(currentUser.email);
          setUid(currentUser.uid);

          const userKey = `caretaker_${currentUser.uid}`;
          const caretakerName = await AsyncStorage.getItem(`${userKey}_name`);
          const caretakerEmail = await AsyncStorage.getItem(`${userKey}_email`);
          const caretakerUid = await AsyncStorage.getItem(`${userKey}_uid`);

          if (caretakerName !== null && caretakerEmail !== null && caretakerUid !== null) {
            setName(caretakerName);
            setEmail(caretakerEmail);
            setUid(caretakerUid);
          } else {
            console.log('Care Taker details not found in AsyncStorage');
          }
        }
      } catch (error) {
        console.error('Error retrieving care taker data from AsyncStorage:', error.message);
      }
      fetchUserUid();
    };

    getUserData();
  }, []);

  const fetchUserUid = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const userId = user.uid;
        setUid(userId);
      }
    } catch (error) {
      console.error('Error fetching user UID:', error);
    }
  };

  const signOut = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await auth().signOut();
  
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      } else {
        console.log('No user is currently signed in.');
      }
    } catch (error) {
      console.error('Logout Error:', error);
      console.error('Full Error Message:', error.message); // Print the full error message
      Alert.alert('Logout Failed', 'An error occurred while logging out. Please try again.');
    }
  };
  
  const handleCameraLaunch = () => {
    setShowModal(false); // Close the modal
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const handleImageSelection = () => {
    setShowModal(false); // Close the modal
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <View style={styles.upperHalfBackground}>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/back.png")} // Changed to back.png
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.title}>CareTaker Profile</Text>

        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.avatarContainer}>
            <Image
              source={{ uri: selectedImage ? selectedImage : 'https://via.placeholder.com/150' }}
              style={styles.avatar}
            />
            <View style={styles.cameraIconContainer}>
              <Text style={styles.cameraIcon}>📷</Text>
            </View>
          </TouchableOpacity>
      </View>

      <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalButton} onPress={handleImageSelection}>
                <Text style={styles.modalButtonText}>Select from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCameraLaunch}>
                <Text style={styles.modalButtonText}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setShowModal(false)}>
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Name: {name}</Text>
        <Text style={styles.infoText}>Email: {email}</Text>
        <Text style={styles.infoText}>UID: {uid}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CareTakerEdit")}>
          <Text style={styles.buttonText}>Edit Profile</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Setting")}>
          <Text style={styles.buttonText}>Settings</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => navigation.navigate("SignIn")}>
          <Text style={[styles.buttonText, styles.logoutButtonText]}>Logout</Text>
          <Text style={[styles.buttonArrow, styles.logoutButtonText]}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
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
    marginTop: 400,
    borderWidth: 4,
    borderColor: '#fff', // Makes the avatar stand out
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },

  cameraIconContainer: {
    position: 'absolute',
    bottom: -55,
    right: 5,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 5,
  },
  cameraIcon: {
    fontSize: 25,
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
    marginBottom: 10,
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
  backButton: {
    position: 'absolute',
    top: hp('2%'),
    left: wp('2%'),
    zIndex: 1,
  },

  backIcon: {
    width: wp('8%'),
    height: wp('8%'),
    tintColor: 'white',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalButton: {
    paddingVertical: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
  },
  cancelButton: {
    borderBottomWidth: 0, // Remove border for cancel button
    borderTopWidth: 1, // Add border at top
    borderTopColor: '#ccc',
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'red',
  },
});

export default CareTakerProfileScreen;