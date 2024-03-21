import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Image, TextInput, Alert } from 'react-native';

const CommonDBDCaretaker = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  const handleAddNote = (note) => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const noteWithDateTime = { note, date, time };
    setNotes([...notes, noteWithDateTime]);
  };

  const openNotesUpdateScreen = () => {
    navigation.navigate("CTNotesUpdate", { onSave: handleAddNote });
  };

  const handleDeleteNote = (index) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedNotes = [...notes];
            updatedNotes.splice(index, 1);
            setNotes(updatedNotes);
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.blueSection}>
        <View style={styles.userInfoContainer}>
          <TouchableOpacity style={styles.userProfileButton} onPress={() => navigation.navigate("CareTakerPF")}>
            <Image source={require('../assets/doc.png')} style={styles.profileImage} />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Jane Doe</Text>
            <Text style={styles.userRole}>Caretaker</Text>
          </View>
        </View>
        {/* content for the blue section */}
      </View>

      <View style={styles.whiteSection}>
        {/* Circular Buttons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.circularButton}>
            <Image source={require('../assets/VidCall.png')} style={styles.buttonImage1} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circularButton}>
            <Image source={require('../assets/msg.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circularButton}>
            <Image source={require('../assets/docNotes.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circularButton}>
            <Image source={require('../assets/careNote.png')} style={styles.buttonImage} />
          </TouchableOpacity>
        </ScrollView>

        {/* Gray Section for Notes */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.graySection}>
          {notes.map((note, index) => (
            <View key={index} style={styles.noteContainer}>
              <View style={styles.noteHeader}>
                <Text style={styles.noteDate}>{note.date} {note.time}</Text>
                <TouchableOpacity onPress={() => handleDeleteNote(index)}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.noteText}>{note.note}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.cornerButton} onPress={openNotesUpdateScreen}>
          <Image source={require('../assets/editIcon.png')} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const CTNotesUpdate = ({ route, navigation }) => {
  const [note, setNote] = useState('');

  const handleSaveNote = () => {
    route.params.onSave(note);
    navigation.goBack();
  };

  return (
    <View style={styles.updateContainer}>
      <TextInput
        style={styles.input}
        onChangeText={setNote}
        placeholder="Enter your note"
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#199BC3',
  },
  blueSection: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#199BC3',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfileButton: {
    backgroundColor: '#29CF9D',
    padding: 1,
    borderRadius: 100,
    marginRight: 40,
    marginLeft: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    color: 'white',
    fontSize: 32,
    marginBottom: 5,
  },
  userRole: {
    color: 'white',
    fontSize: 22,
  },
  whiteSection: {
    flex: 5,
    backgroundColor: 'white',
    padding: 20,
  },
  circularButton: {
    backgroundColor: '#29CF9D',
    borderRadius: 60,
    width: 80,
    height: 80,
    marginRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage1: {
    width: 50,
    height: 30,
  },
  buttonImage: {
    width: 50,
    height: 50,
  },
  graySection: {
    marginTop: 10,
  },
  noteContainer: {
    backgroundColor: '#EDEDED',
    width: 250,
    padding: 15,
    height: 380, // Adjust height according to your preference
    marginRight: 20,
    borderRadius: 10,
    marginBottom: 1,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  noteDate: {
    color: 'gray',
  },
  deleteButton: {
    color: 'gray',
  },
  noteText: {
    fontSize: 16,
  },
  cornerButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#29CF9D',
    borderRadius: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  saveButton: {
    backgroundColor: '#29CF9D',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export { CommonDBDCaretaker, CTNotesUpdate };
