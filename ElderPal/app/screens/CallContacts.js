import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CallContacts() {
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
          phoneNumber: newContactNumber,
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
      {contacts.length > 0 && (
        <Text style={contactStyle.title}>Select a Contact To Call</Text>
      )}

      <ScrollView contentContainerStyle={contactStyle.scrollView} ref={scrollViewRef}>
        {contacts.length === 0 && !showAddContactFields && (
          <Text style={{ textAlign: 'center', fontSize: 24, marginTop: "80%" }}>No contacts to display!</Text>
        )}

        {contacts.map(contact => (
          <TouchableOpacity key={contact.id} onPress={() => console.log('Calling', contact.name)}>
            <View style={contactStyle.card}>
              <Image
                source={require('../assets/callicon.png')}
                style={contactStyle.pic}
              />
              <View style={{ flex: 1 }}>
                <Text style={contactStyle.conName}>{contact.name}</Text>
                <Text style={contactStyle.conNum}>{contact.phoneNumber}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteContact(contact.id)}>
                <Image
                  source={require('../assets/delete.png')}
                  style={{ width: 30, height: 30, marginRight: 10 }}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {!showAddContactFields && (
        <TouchableOpacity style={contactStyle.addButton} onPress={toggleAddContactFields}>
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: '600' }}>Add Contact</Text>
        </TouchableOpacity>
      )}

      {showAddContactFields && (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <TextInput
            style={contactStyle.inputField}
            placeholder="Contact Name"
            value={newContactName}
            onChangeText={text => setNewContactName(text)}
          />
          <TextInput
            style={contactStyle.inputField}
            placeholder="ID Number"
            keyboardType="numeric"
            value={newContactNumber}
            onChangeText={text => setNewContactNumber(text)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '80%',
              marginTop: 20,
              marginBottom: 50,
            }}>
            <TouchableOpacity
              style={[contactStyle.addButton, { marginLeft: 20 }]}
              onPress={addContact}>
              <Text
                style={{
                  fontSize: 22,
                  color: '#fff',
                  paddingVertical: 2,
                  paddingHorizontal: 5,
                }}>
                Add Contact
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[contactStyle.cancelButton, { marginRight: 10 }]}
              onPress={toggleAddContactFields}>
              <Text
                style={{
                  fontSize: 22,
                  color: '#fff',
                  paddingVertical: 2,
                  paddingHorizontal: 5,
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
    fontSize: 28,
    marginLeft: 20,
    marginVertical: 50,
    color: 'black',
    fontWeight: '600',
    marginBottom: 40,
  },
  scrollView: {
    paddingBottom: 20, // Add padding to the bottom of the ScrollView
  },
  card: {
    borderColor: '#258e25',
    borderWidth: 2,
    margin: 10,
    marginBottom: -5, // Reduce marginBottom to allow space for the next card
    flexDirection: 'row',

    borderRadius: 8,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  pic: {
    width: 35,
    height: 45,
    marginLeft: 20,
    marginRight: 20,
  },
  conName: {
    fontSize: 30,
    marginVertical: 10,
    fontWeight: '600',
    color: '#454545',
  },
  conNum: {
    fontSize: 20,
    marginRight: 20,
    marginVertical: -12,
    fontWeight: '600',
    color: '#454545',
    paddingBottom: 15
  },
  inputField: {
    height: 50,
    width: 300,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    fontSize: 22,
  },
  addButton: {
    backgroundColor: '#258e25',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#c62828',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
};
