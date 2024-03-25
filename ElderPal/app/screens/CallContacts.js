import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function CallContacts() {
  const navigation = useNavigation(); // Initialize navigation
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');
  const [showAddContactFields, setShowAddContactFields] = useState(false);
  const scrollViewRef = useRef();

  // Load contacts from AsyncStorage on component mount
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const savedContacts = await AsyncStorage.getItem('contacts');
        if (savedContacts !== null) {
          setContacts(JSON.parse(savedContacts));
        }
      } catch (error) {
        console.error('Error loading contacts:', error);
      }
    };
    loadContacts();
  }, []);

  // Save contacts to AsyncStorage whenever contacts state changes
  useEffect(() => {
    const saveContacts = async () => {
      try {
        await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
      } catch (error) {
        console.error('Error saving contacts:', error);
      }
    };
    saveContacts();
  }, [contacts]);

  const addContact = () => {
    if (newContactName.trim() !== '' && newContactNumber.trim() !== '') {
      setContacts([
        ...contacts,
        {
          id: contacts.length + 1,
          name: newContactName,
          IDNumber: newContactNumber,
        },
      ]);
      setNewContactName('');
      setNewContactNumber('');
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    }
  };

  const toggleAddContactFields = () => {
    setShowAddContactFields(!showAddContactFields);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <View style={contactStyle.mainView}>
      <TouchableOpacity
        style={contactStyle.backButton}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/back.png')}
          style={contactStyle.backIcon}
        />
      </TouchableOpacity>

      {contacts.length > 0 && (
        <Text style={contactStyle.title}>Select a Contact To Call</Text>
      )}

      <ScrollView contentContainerStyle={contactStyle.scrollView} ref={scrollViewRef}>
        {contacts.length === 0 && !showAddContactFields && (
          <Text
            style={{ textAlign: 'center', fontSize: hp('3%'), marginTop: '80%', color: 'grey' }}>
            No contacts to display!
          </Text>
        )}

        {contacts.map(contact => (
          <TouchableOpacity
            key={contact.id}
            onPress={() => navigation.navigate('VideoCall', { InviteeID: contact.IDNumber, userName: contact.name })}>
            <View style={contactStyle.card}>
              <Image
                source={require('../assets/callicon.png')}
                style={contactStyle.pic}
              />
              <View style={{ flex: 1 }}>
                <Text style={contactStyle.conName}>{contact.name}</Text>
                <Text style={contactStyle.conNum}>{contact.IDNumber}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteContact(contact.id)}>
                <Image
                  source={require('../assets/delete.png')}
                  style={{
                    width: wp('8%'),
                    height: hp('4%'),
                    marginRight: wp('2%'),
                  }}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {!showAddContactFields && (
        <TouchableOpacity
          style={contactStyle.addButton}
          onPress={toggleAddContactFields}>
          <Text style={{ fontSize: hp('3%'), color: '#fff', fontWeight: '600' }}>
            Add Contact
          </Text>
        </TouchableOpacity>
      )}

      {showAddContactFields && (
        <View style={{ alignItems: 'center', marginTop: hp('2%') }}>
          <TextInput
            style={contactStyle.inputField}
            placeholder="Contact Name"
            placeholderTextColor="grey"
            value={newContactName}
            onChangeText={text => setNewContactName(text)}
          />
          <TextInput
            style={contactStyle.inputField}
            placeholder="ID Number"
            placeholderTextColor="grey"
            keyboardType="numeric"
            value={newContactNumber}
            onChangeText={text => setNewContactNumber(text)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: wp('80%'),
              marginTop: hp('2%'),
              marginBottom: hp('5%'),
            }}>
            <TouchableOpacity
              style={[contactStyle.addButton, { marginLeft: wp('6%') }]}
              onPress={addContact}>
              <Text
                style={{
                  fontSize: hp('2.5%'),
                  color: '#fff',
                  paddingVertical: hp('0.5%'),
                  paddingHorizontal: wp('1%'),

                }}>
                Add Contact
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[contactStyle.cancelButton, { marginRight: wp('3%') }]}
              onPress={toggleAddContactFields}>
              <Text
                style={{
                  fontSize: hp('2.5%'),
                  color: '#fff',
                  paddingVertical: hp('0.5%'),
                  paddingHorizontal: wp('1%'),
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const contactStyle = {
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: hp('3.5%'),
    marginLeft: wp('4%'),
    marginVertical: hp('4%'),
    color: 'black',
    fontWeight: '600',
    marginBottom: hp('3%'),
    marginTop: hp('7%'),
  },
  scrollView: {
    paddingBottom: hp('2%'),
  },
  card: {
    borderColor: '#258e25',
    borderWidth: wp('0.5%'),
    margin: wp('2%'),
    marginBottom: -wp('0.2%'),
    flexDirection: 'row',
    borderRadius: wp('4%'),
    borderTopLeftRadius: wp('10%'),
    borderBottomRightRadius: wp('10%'),
    alignItems: 'center',
  },
  pic: {
    width: wp('10%'),
    height: hp('5%'),
    marginLeft: wp('4%'),
    marginRight: wp('4%'),
  },
  conName: {
    fontSize: hp('3.5%'),
    marginVertical: hp('2%'),
    fontWeight: '600',
    color: '#454545',
  },
  conNum: {
    fontSize: hp('2.5%'),
    marginRight: wp('4%'),
    marginVertical: -hp('1%'),
    fontWeight: '600',
    color: '#454545',
    paddingBottom: hp('2%'),
  },
  inputField: {
    height: hp('6%'),
    width: wp('70%'),
    marginBottom: hp('1%'),
    borderRadius: wp('3%'),
    backgroundColor: '#f2f2f2',
    paddingHorizontal: wp('3%'),
    fontSize: hp('2.5%'),
    color: 'black'
  },
  addButton: {
    marginLeft: hp('2%'),
    marginTop: hp('1%'),
    backgroundColor: '#258e25',
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('3%'),
    margin: wp('1%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
    marginRight: hp('2%'),
  },
  cancelButton: {
    backgroundColor: '#c62828',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('3%'),
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
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
};
