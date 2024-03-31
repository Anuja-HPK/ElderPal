import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Image, TextInput, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CommonDBDoctor = ({ navigation, userName }) => {
  const [notes, setNotes] = useState([]);

  const handleAddNote = (note) => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const noteWithDateTime = { note, date, time };
    setNotes([...notes, noteWithDateTime]);
  };

  const openNotesUpdateScreen = () => {
    navigation.navigate("NotesUpdate", { onSave: handleAddNote });
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
          <TouchableOpacity style={styles.userProfileButton} onPress={() => navigation.navigate("DoctorPF")}>
            <Image source={require('../assets/doc.png')} style={styles.profileImage} />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Welcome, Doctor!</Text>
            <Text style={styles.userRole}>Neurologist</Text>
          </View>
        </View>
        {/* content for the blue section */}
      </View>

      <View style={styles.whiteSection}>
        {/* Circular Buttons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.circularButton} onPress={() => navigation.navigate("Call")}>
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

const NotesUpdate = ({ route, navigation }) => {
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
    flex: 1,
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
    padding: wp('1%'),
    borderRadius: wp('100%') / 2,
    marginRight: wp('5%'),
    marginLeft: wp('5%'),
  },
  profileImage: {
    width: wp('30%'),
    height: wp('30%'),
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    color: 'white',
    fontSize: hp('3.5%'),
    marginBottom: hp('1%'),
  },
  userRole: {
    color: 'white',
    fontSize: hp('2.5%'),
  },
  whiteSection: {
    flex: 5,
    backgroundColor: 'white',
    padding: wp('5%'),
  },
  circularButton: {
    backgroundColor: '#29CF9D',
    borderRadius: wp('10%'),
    width: wp('18%'),
    height: wp('18%'),
    marginRight: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage1: {
    width: wp('10%'),
    height: wp('6%'),
  },
  buttonImage: {
    width: wp('10%'),
    height: wp('10%'),
  },
  graySection: {
    marginTop: hp('1%'),
  },
  noteContainer: {
    backgroundColor: '#EDEDED',
    width: wp('65%'),
    padding: wp('5%'),
    height: hp('45%'),
    marginRight: wp('5%'),
    borderRadius: wp('2%'),
    marginBottom: hp('0.5%'),
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  noteDate: {
    color: 'gray',
  },
  deleteButton: {
    color: 'gray',
  },
  noteText: {
    fontSize: hp('2%'),
  },
  cornerButton: {
    position: 'absolute',
    bottom: hp('3%'),
    right: wp('4%'),
    width: wp('18%'),
    height: wp('18%'),
    backgroundColor: '#29CF9D',
    borderRadius: wp('15%'),
    padding: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: wp('5%'),
  },
  input: {
    borderColor: 'gray',
    borderWidth: wp('0.3%'),
    borderRadius: wp('5%'),
    marginBottom: hp('2%'),
    padding: wp('3%'),
  },
  saveButton: {
    backgroundColor: '#29CF9D',
    padding: wp('3%'),
    borderRadius: wp('1%'),
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: hp('2%'),
  },
});

export { CommonDBDoctor, NotesUpdate };


