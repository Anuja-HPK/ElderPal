import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

const App = () => {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.blueSection}>
          
          <View style={styles.userInfoContainer}>
            <TouchableOpacity style={styles.userProfileButton}>
              <Image source={require('../assets/doc.png')} style={styles.profileImage} />
            </TouchableOpacity>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Steve Doe</Text>
              <Text style={styles.userRole}>Family</Text>
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
  
          {/* Gray Section for  Notes */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.graySection}>
          {/* Note 1 */}
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>
              The note 1 : Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>

          {/* Note 2 */}
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>
              This is Note 2 content.
            </Text>
          </View>

          {/* Note 3 */}
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>
              This is Note 3 content.
            </Text>
          </View>
          {/* to Add more notes  */}
        </ScrollView>
      </View>
    </ScrollView>
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
  buttonImage1:{
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
    height: 400,
    marginRight: 20,
    borderRadius: 10,
    marginBottom: 1,
  },
  noteText: {
    fontSize: 26,
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
});

export default App;
