import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ElderDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("ElderPF")}>
        <View style={styles.profTextStyle}>
          <Image
            source={require('../assets/profImage.png')} // add prof image
            style={styles.pic}
          />
          {/* name tag */}
          <Text style={styles.profText}>Welcome! John Aiya</Text>
        </View>
      </TouchableOpacity>

      {/* action buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AIassistant")}>
          <Text style={styles.text}>AI Assistant</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Call")}>
          <Text style={styles.text}>Call</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ToDo")}>
          <Text style={styles.text}>To-Do List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionContainer: {
    marginHorizontal: wp('8%'),
    marginBottom: hp('2%'),
    marginVertical: hp('4%'),
  },
  button: {
    alignItems: 'center',
    borderRadius: wp('10%'),
    paddingVertical: hp('2%'),
    backgroundColor: '#49d049',
  },
  text: {
    color: 'black',
    fontSize: hp('3%'),
    fontWeight: '700',
  },
  pic: {
    width: wp('28%'),
    height: hp('15%'),
    marginVertical: hp('5%'),
    marginLeft: wp('5%'),
  },
  profText: {
    fontSize: hp('3%'),
    marginLeft: wp('5%'),
    fontWeight: '600',
    color: 'black',
  },
  backButton: {
    fontSize: hp('3%'),
    marginLeft: wp('5%'),
    marginTop: hp('2%'),
    color: 'black',
  },
  profTextStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
});
