import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import React from "react";

export default function ChooseRoleScreen() {
  return (

    <ImageBackground source={require("../assets/roleimage.jpg")} style={{width:"100%", height: "100%" }}>
      <ScrollView>
      <View style={{alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../assets/Logo.png")}
          style={{ width: 170, height: 165, marginVertical:30 }}
        />
      </View>
      <View style={{marginBottom: 20, marginLeft:20 }}>
        <Text style={{ fontSize: 32, fontWeight: "600", color: "black" }}>
          I am,
        </Text>
      </View>

      <View style={roleStyles.container}>
        <TouchableOpacity style={roleStyles.button}>
          <Text style={roleStyles.text}>Elderly Person</Text>
        </TouchableOpacity>
      </View>

      <View style={roleStyles.container}>
        <TouchableOpacity style={roleStyles.button}>
          <Text style={roleStyles.text}>Doctor</Text>
        </TouchableOpacity>
      </View>

      <View style={roleStyles.container}>
        <TouchableOpacity style={roleStyles.button}>
          <Text style={roleStyles.text}>Caregiver</Text>
        </TouchableOpacity>
      </View>

      <View style={roleStyles.container}>
        <TouchableOpacity style={roleStyles.button}>
          <Text style={roleStyles.text}>Family Member</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </ImageBackground>
  );
}

const roleStyles = {
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    borderRadius: 40,
    padding: 20,
    backgroundColor: "#fff",
  },
  text: {
    color: "black",
    fontSize: 28,
    fontWeight: "500",
  },
};
