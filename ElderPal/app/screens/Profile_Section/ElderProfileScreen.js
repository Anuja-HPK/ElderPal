import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker';
import { launchCamera } from 'react-native-image-picker';

const ElderProfileScreen = () => {
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

          const userKey = `elder_${currentUser.uid}`;
          const elderName = await AsyncStorage.getItem(`${userKey}_name`);
          const elderEmail = await AsyncStorage.getItem(`${userKey}_email`);
          const elderUid = await AsyncStorage.getItem(`${userKey}_uid`);

          if (elderName !== null && elderEmail !== null) {
            setName(elderName);
            setEmail(elderEmail);
            setUid(elderUid);
          } else {
            console.log('Elder details not found in AsyncStorage');
          }
        }
      } catch (error) {
        console.error('Error retrieving elder data from AsyncStorage:', error.message);
      }
      //fetch the user id to display
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
        // Proceed with sign out
        await auth().signOut();

        // Clear user details only upon explicit sign-out
        // (Do not clear user details here if you want them to persist across sessions)
        // await AsyncStorage.removeItem(`${userKey}_name`);
        // await AsyncStorage.removeItem(`${userKey}_email`);
        // await AsyncStorage.removeItem(`${userKey}_uid`);

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
          <Text style={styles.title}>Elder Profile</Text>

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
          <Text style={styles.infoText}>Name : {name}</Text>
          <Text style={styles.infoText}>Email : {email}</Text>
          <Text style={styles.infoText}>UID: {uid}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ElderEdit')} // Navigate to EditProfileScreen
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => { }}>
            <Text style={styles.buttonText}>Emergency Contact</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Setting")}>
            <Text style={styles.buttonText}>Settings</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={signOut}>
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
    height: hp('30%'),
    width: '100%',
    backgroundColor: '#258e25',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomRightRadius: wp('20%'), // Adjusted radius
    borderBottomLeftRadius: wp('20%'), // Adjusted radius
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

  title: {
    fontSize: hp('3.5%'), // Adjusted fontSize
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    top: hp('10%'), // Adjusted top position
  },
  avatar: {
    width: wp('30%'), // Adjusted width
    height: wp('30%'), // Adjusted height
    borderRadius: wp('15%'), // Adjusted borderRadius
    marginBottom: -hp('4%'), // Adjusted marginBottom
    borderWidth: wp('2%'), // Adjusted borderWidth
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: wp('4%'), // Adjusted shadowRadius
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
    marginTop: hp('8%'), // Adjusted marginTop
    alignItems: 'center',
  },

  infoText: {
    fontSize: hp('2.2%'), // Adjusted fontSize
    marginTop: -hp('2%'), // Adjusted marginTop
    marginBottom: hp('2%'), // Adjusted marginBottom
    color: '#000000',
    fontWeight: 'bold',
  },

  buttonContainer: {
    width: wp('90%'), // Adjusted width
    alignItems: 'center',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#49d049',
    paddingVertical: hp('2%'), // Adjusted paddingVertical
    paddingHorizontal: wp('5%'), // Adjusted paddingHorizontal
    width: wp('90%'), // Adjusted width
    borderRadius: wp('5%'), // Adjusted borderRadius
    marginTop: hp('2%'), // Adjusted marginTop
    marginBottom: hp('1%'), // Adjusted marginBottom
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('2%'), // Adjusted fontSize
  },

  buttonArrow: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: hp('2.5%'), // Adjusted fontSize
  },

  logoutButton: {
    backgroundColor: '#49d049',
  },

  logoutButtonText: {
    color: 'red',
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
  backButton: {
    position: 'absolute',
    top: hp('2%'), // Adjusted to 2% of the screen height
    left: wp('2%'), // Adjusted to 2% of the screen width
    zIndex: 1,
  },

  backIcon: {
    width: wp('8%'),
    height: wp('8%'),
    tintColor: 'black',
  },
});

export default ElderProfileScreen;
