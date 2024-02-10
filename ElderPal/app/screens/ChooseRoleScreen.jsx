import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";

export default function ChooseRoleScreen() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: "#199BC3" }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../assets/Logo.png")}
          style={{ width: 170, height: 165 }}
        />
      </View>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 32, fontWeight: "600", color: "#ffffff" }}>
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
