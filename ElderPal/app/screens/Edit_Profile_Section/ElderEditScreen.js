import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, Alert, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const EditProfileScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('unknown');
  const [age, setAge] = useState('');
  const [ageError, setAgeError] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [allergies, setAllergies] = useState('');
  const [uid, setUid] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    fetchProfileData();
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
          setSelectedBloodGroup(data.bloodGroup || '');
          setAllergies(data.allergies || '');
          setAddress1(data.address1 || '');
          setAddress2(data.address2 || '');
          setCity(data.city || '');
          setCountry(data.country || '');
        }
      }
    } catch (error) {
      console.error('Error fetching elder profile:', error);
      Alert.alert('Error', 'Failed to fetch elder profile data. Please try again.');
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
      filteredText = '100';
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
          allergies,
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.upperHalfBackground}></View>
      <ScrollView contentContainerStyle={{ padding: wp('5%') }}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/back.png")}
            style={[styles.backIcon, { width: wp('8%'), height: wp('8%') }]}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { marginBottom: hp('5%') }]}>Elder Edit Profile</Text>
        <Text style={styles.userInfoText}>User ID: {uid}</Text>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TextInput style={[styles.input, { height: hp('5%') }]} placeholder="First Name" placeholderTextColor="#ccc" />
        <TextInput style={[styles.input, { height: hp('5%') }]} placeholder="Last Name" placeholderTextColor="#ccc" />
        <View>
          <TouchableOpacity onPress={showDatepicker} style={[styles.datePicker, { height: hp('5%') }]}>
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
          style={[styles.input, { height: hp('5%') }]}
          placeholder="Age"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          value={age}
          onChangeText={handleAgeChange}
        />
        {ageError ? <Text style={styles.errorText}>{ageError}</Text> : null}
        <View style={[styles.pickerContainer, { height: hp('5%') }]}>
          <Picker
            selectedValue={selectedGender}
            onValueChange={(itemValue) => setSelectedGender(itemValue)}
            style={styles.picker}
            mode="dropdown"
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

        <Text style={styles.sectionTitle}>Medical Information</Text>
        <View style={[styles.pickerContainer, { height: hp('5%') }]}>
          <Picker
            selectedValue={selectedBloodGroup}
            onValueChange={(itemValue) => setSelectedBloodGroup(itemValue)}
            style={styles.picker}
            mode="dropdown"
          >
            <Picker.Item label="Select your blood group" value="unknown" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="AB+" value="AB+" />
            <Picker.Item label="AB-" value="AB-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
          </Picker>
        </View>
        <TextInput style={[styles.input, { height: hp('5%') }]} placeholder="Allergies" placeholderTextColor="#ccc" />
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
    height: hp('40%'), // Adjusted height
    width: wp('100%'),
    borderBottomRightRadius: 500,
  },

  input: {
    height: hp('4%'), // Adjusted height
    marginBottom: hp('1.5%'), // Adjusted marginBottom
    borderWidth: 1,
    padding: wp('2%'), // Adjusted padding
    borderColor: '#258e25',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: wp('4%'), // Adjusted borderRadius
    fontWeight: 'bold',
  },

  datePicker: {
    height: hp('10%'), // Adjusted height
    marginBottom: hp('1.5%'), // Adjusted marginBottom
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: '#258e25',
    padding: wp('5%'), // Adjusted padding
    justifyContent: 'center',
    borderRadius: wp('4%'), // Adjusted borderRadius

  },

  datePickerText: {
    color: 'black',
    fontSize: hp('1.5%'),
    fontWeight: 'bold',
    height: hp('2.5%'),
  },

  button: {
    backgroundColor: '#49d049',
    padding: wp('3%'), // Adjusted padding
    alignItems: 'center',
    borderRadius: wp('4%'), // Adjusted borderRadius
    marginTop: hp('3%'), // Adjusted marginTop
  },

  buttonText: {
    color: 'white',
    fontSize: hp('2.2%'), // Adjusted fontSize
    fontWeight: 'bold',
  },

  backButton: {
    position: 'absolute',
    top: hp('2%'),
    left: wp('2%'),
    zIndex: 1,
  },

  backIcon: {
    tintColor: 'white',
  },

  title: {
    fontSize: hp('3.5%'), // Adjusted fontSize
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: hp('5%'), // Adjusted marginBottom
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: hp('2.5%'), // Adjusted fontSize
    color: 'black',
    marginBottom: hp('2.5%'), // Adjusted marginBottom
    marginTop: hp('2.5%'), // Adjusted marginTop
    fontWeight: 'bold',
  },

  pickerContainer: {
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: '#258e25',
    marginBottom: hp('1.5%'), // Adjusted marginBottom
    borderRadius: wp('4%'), // Adjusted borderRadius
  },

  picker: {
    height: hp('6%'), // Adjusted height
    color: 'black',
  },

  errorText: {
    color: 'red',
    marginBottom: hp('2%'), // Adjusted marginBottom
  },
});

export default EditProfileScreen;

