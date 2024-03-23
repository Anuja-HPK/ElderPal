import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const FamilyEditScreen = () => {
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [age, setAge] = useState('');
  const [ageError, setAgeError] = useState('');
  const [selectedGender, setSelectedGender] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [uid, setUid] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    // Fetch elder's profile data when component mounts
    fetchProfileData();
    // Fetch user's UID
    fetchUserUid();
  }, []);

  const fetchProfileData = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const userId = user.uid;
        const userProfile = await firestore().collection('users').doc(userId).get();
        const data = userProfile.data();
        if (data) {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setDate(data.dateOfBirth ? new Date(data.dateOfBirth) : new Date());
          setAge(data.age);
          setSelectedGender(data.gender);
          setAddress1(data.address1 || ''); // Set default value if undefined
          setAddress2(data.address2 || ''); // Set default value if undefined
          setCity(data.city || ''); // Set default value if undefined
          setCountry(data.country || ''); // Set default value if undefined
        }
      }
    } catch (error) {
      console.error('Error fetching family member profile:', error);
      Alert.alert('Error', 'Failed to fetch family member profile data. Please try again.');
    }
  };

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
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleAgeChange = (text) => {
    let filteredText = text.replace(/[^0-9]/g, '');
    const num = parseInt(filteredText, 10);

    if (num > 100) {
      filteredText = '100'; // Set to 100 if the entered number is greater
      setAgeError('Age cannot be more than 100');
    } else {
      setAgeError('');
    }
    setAge(filteredText);
  };

  const saveChanges = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const userId = user.uid;
        const updateData = {
          firstName,
          lastName,
          dateOfBirth: date ? date.toISOString() : null,
          age,
          gender: selectedGender,
          address1,
          address2,
          city,
          country,
        };
        // Remove undefined fields from updateData
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);
        await firestore().collection('users').doc(userId).update(updateData);
        Alert.alert('Success', 'Profile updated successfully!');
      } else {
        Alert.alert('Error', 'User not found. Please login again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1}}>
        <View style={styles.upperHalfBackground}></View>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
      <TouchableOpacity onPress={() => navigation.navigate("FamilyMemberPF")} style={styles.backButtonStyle}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Edit Profile</Text>

        {/* Personal Information Section */}
        <Text style={styles.userInfoText}>User ID: {uid}</Text>

        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TextInput style={styles.input} placeholder="First Name" placeholderTextColor="#999" />
        <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor="#999" />

        <View>
          <TouchableOpacity onPress={showDatepicker} style={styles.datePicker}>
            <Text style={styles.datePickerText}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={age}
          onChangeText={handleAgeChange}
        />
        {ageError ? <Text style={styles.errorText}>{ageError}</Text> : null}

        <View style={styles.pickerContainer}>
        <Picker
            selectedValue={selectedGender}
            onValueChange={(itemValue) => setSelectedGender(itemValue)}
            style={styles.picker}
            mode="dropdown" // This prop is Android-only
        >
            <Picker.Item label="Select your gender" value="unknown" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
            <Picker.Item label="Prefer not to say" value="preferNotToSay" />
        </Picker>
        </View>


        <Text style={styles.sectionTitle}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Address 1"
          placeholderTextColor="#999"
          value={address1}
          onChangeText={setAddress1}
        />

        <TextInput
          style={styles.input}
          placeholder="Address 2"
          placeholderTextColor="#999"
          value={address2}
          onChangeText={setAddress2}
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor="#999"
          value={city}
          onChangeText={setCity}
        />

        <TextInput
          style={styles.input}
          placeholder="Country"
          placeholderTextColor="#999"
          value={country}
          onChangeText={setCountry}
        />
        
        {/* Save Button */}
        <TouchableOpacity style={styles.button} onPress={saveChanges}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    upperHalfBackground: {
        backgroundColor: '#258e25',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '20%',
        width: '100%',
        borderBottomRightRadius: 500,
      },
    
    input: {
      height: 40,
      marginBottom: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: '#258e25',
      backgroundColor: 'white',
      color: 'black',
      borderRadius: 15,
      fontWeight: 'bold',
    },

    datePicker: {
      height: 40,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#258e25',
      padding: 10,
      justifyContent: 'center',
      borderRadius: 15,
    },

    datePickerText: {
      color: 'black',
    },

    button: {
      backgroundColor: '#49d049',
      padding: 6,
      alignItems: 'center',
      borderRadius: 15,
    },
    
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },

    backButtonStyle: {
      marginBottom: 20,
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
      fontSize: 30,
      fontWeight: 'bold',
      color: '#ffffff', 
      marginBottom: 50,
      textAlign: 'center',
    },

    sectionTitle: {
      fontSize: 20,
      color: '#258e25',
      marginBottom: 20,
      marginTop: 20,
      fontWeight: 'bold',
    },
    
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#258e25',
      marginBottom: 12,
      borderRadius: 15, // Optional: for rounded corners
    },

    picker: {
      height: 40,
      color: 'black',
    },

    errorText: {
        color: 'red', // Example error text style
        marginBottom: 10,
    },
  });
  
export default FamilyEditScreen;