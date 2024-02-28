import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react';

export default function CallContacts() {
  return (
    <View style={contactStyle.mainView}>
      <Text style={contactStyle.title}>Select a Contact To Call,</Text>

      {/* can use card as another component while create functions */}
      <ScrollView>
        <TouchableOpacity>
          <View style={contactStyle.card}>
            <Image
              source={require('../assets/callicon.png')} // add call icon
              style={contactStyle.pic}
            />
            <Text style={contactStyle.conName}>Doctor</Text>
            <Text style={contactStyle.conNum}>0781234567</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={contactStyle.card}>
            <Image
              source={require('../assets/callicon.png')} // add call icon
              style={contactStyle.pic}
            />
            <Text style={contactStyle.conName}>Son</Text>
            <Text style={contactStyle.conNum}>0781234567</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={contactStyle.card}>
            <Image
              source={require('../assets/callicon.png')} // add call icon
              style={contactStyle.pic}
            />
            <Text style={contactStyle.conName}>Caregiver</Text>
            <Text style={contactStyle.conNum}>0781234567</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={contactStyle.card}>
            <Image
              source={require('../assets/callicon.png')} // add call icon
              style={contactStyle.pic}
            />
            <Text style={contactStyle.conName}>Daughter</Text>
            <Text style={contactStyle.conNum}>0781234567</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={contactStyle.card}>
            <Image
              source={require('../assets/callicon.png')} // add call icon
              style={contactStyle.pic}
            />
            <Text style={contactStyle.conName}>Friend</Text>
            <Text style={contactStyle.conNum}>0781234567</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={contactStyle.card}>
            <Image
              source={require('../assets/callicon.png')} // add call icon
              style={contactStyle.pic}
            />
            <Text style={contactStyle.conName}>friend 2</Text>
            <Text style={contactStyle.conNum}>0781234567</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={contactStyle.card}>
            <Image
              source={require('../assets/callicon.png')} // add call icon
              style={contactStyle.pic}
            />
            <Text style={contactStyle.conName}>Friend 3</Text>
            <Text style={contactStyle.conNum}>0781234567</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
// REMINDER: MAKE SURE TO VALIDATE CONTACT NAME TO SPECIFIC NUMBER OF CHARACTERS!!! OTHERWISE
// IT MAY OVERLAP WITH ICONS AND THE PHONE NUMBER!!!!

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
    fontWeight: 600,
    marginBottom: 40,
  },
  card: {
    borderColor: '#258e25',
    borderWidth: 2,
    margin: 10,
    marginBottom: -6,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 25,
    marginVertical: 30,
    marginLeft: -60,
    fontWeight: 600,
    color: '#454545',
  },
  conNum: {
    fontSize: 25,
    marginRight: 20,
    marginVertical: 30,
    fontWeight: 600,
    color: '#454545',
  },
};
