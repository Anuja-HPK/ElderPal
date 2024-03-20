import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import auth from '@react-native-firebase/auth';

const FamilyMemberProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    const getData = async () => {
      try {
        // Retrieve the unique key for the current user (e.g., using email)
        const userKey = `familyMember_${userCredential.user.uid}`;

        // Retrieve user details using the unique key
        const familyMemberName = await AsyncStorage.getItem(`${userKey}_name`);
        const familyMemberEmail = await AsyncStorage.getItem(`${userKey}_email`);
        const familyMemberUid = await AsyncStorage.getItem(`${userKey}_uid`);

        if (familyMemberName !== null && familyMemberEmail !== null) {
          setName(familyMemberName);
          setEmail(familyMemberEmail);
          setUid(familyMemberUid);
        } else {
          console.log('Elder details not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error retrieving elder data from AsyncStorage:', error.message);
      }
    };

    getData();
  }, []);

  const handleLogout = async () => {
    try {
      // Proceed with sign out
      await auth().signOut();

      // Clear user details only upon explicit sign-out
      // (Do not clear user details here if you want them to persist across sessions)
      // await AsyncStorage.removeItem(`${userKey}_name`);
      // await AsyncStorage.removeItem(`${userKey}_email`);
      // await AsyncStorage.removeItem(`${userKey}_uid`);

      navigation.reset({
        index: 0,
        routes: [{ name: 'SignInScreen' }],
      });
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Logout Failed', 'An error occurred while logging out. Please try again.');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.upperHalfBackground}>

        <TouchableOpacity /*onPress={() => navigation.goBack()}*/ style={styles.backButtonStyle}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Family Member Profile</Text>

        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{name}</Text>
        <Text style={styles.infoText}>{email}</Text>
        <Text style={styles.infoText}>UID: {uid}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("FamilyMemberEdit")}>
          <Text style={styles.buttonText}>Edit Profile</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("settings")}>
          <Text style={styles.buttonText}>Settings</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
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
    height: '35%',
    width: '100%',
    backgroundColor: '#258e25',
    alignItems: 'center',
    justifyContent: 'flex-end', // Aligns children to the bottom of the container
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },

  backButtonStyle: {
    marginBottom: 120,
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
    backgroundColor: '#4caf50',
    padding: 15,
    width: '100%',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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

export default FamilyMemberProfileScreen;
