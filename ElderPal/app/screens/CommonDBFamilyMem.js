import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native'; 

const App = () => {
  const navigation = useNavigation();
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.blueSection}>

        <View style={styles.userInfoContainer}>
          <TouchableOpacity style={styles.userProfileButton} onPress={() => navigation.navigate("FamilyMemberPF")}>
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

export default App;
