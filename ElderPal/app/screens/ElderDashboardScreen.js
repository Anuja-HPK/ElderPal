import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

export default function ElderDashboardScreen({ navigation }) {
  return (
    <View style={El_dashboard.viewStyle}>
      <TouchableOpacity>
        <Text style={El_dashboard.backButton}>&lt; Back</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ElderPF")}>
        <View style={El_dashboard.profTextStyle}>
          <Image
            source={require('../assets/profImage.png')} // add prof image
            style={El_dashboard.pic}
          />
          {/* name tag */}
          <Text style={El_dashboard.profText}>Welcome! john aiya</Text>
        </View>
      </TouchableOpacity>

      {/* action buttons */}
      <View style={El_dashboard.container}>
        <TouchableOpacity style={El_dashboard.button} onPress={() => navigation.navigate("AIassistant")}>
          <Text style={El_dashboard.text}>AI Assistant</Text>
        </TouchableOpacity>
      </View>

      <View style={El_dashboard.container}>
        <TouchableOpacity style={El_dashboard.button} onPress={() => navigation.navigate("Call")}>
          <Text style={El_dashboard.text}>Call</Text>
        </TouchableOpacity>
      </View>

      <View style={El_dashboard.container}>
        <TouchableOpacity style={El_dashboard.button} onPress={() => navigation.navigate("ToDo")}>
          <Text style={El_dashboard.text}>To-Do List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const El_dashboard = {
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
    marginVertical: 25,
  },
  button: {
    alignItems: 'center',
    borderRadius: 40,
    padding: 20,
    backgroundColor: '#49d049',

  },
  text: {
    color: 'black',
    fontSize: 28,
    fontWeight: '700',
  },
  pic: {
    width: 90,
    height: 90,
    marginVertical: 40,
    marginLeft: 20,
  },
  profText: {
    fontSize: 24,
    marginLeft: 10,
    fontWeight: 600,
    color: 'black',
  },
  backButton: {
    fontSize: 24,
    marginLeft: 20,
    marginTop: 20,
    color: 'black',
  },
  viewStyle: {
    flex: 1,

  },
  profTextStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
};