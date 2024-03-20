import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import React from "react";

export default function ChooseRoleScreen({ navigation }) {
  return (


    <ScrollView>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../assets/Logo.png")}
          style={{ width: 170, height: 165, marginVertical: 30 }}
        />
      </View>
      <View style={{ marginBottom: 20, marginLeft: 20 }}>
        <Text style={{ fontSize: 32, fontWeight: "600", color: "black" }}>
          I am,
        </Text>
      </View>

      <View style={roleStyles.container}>
        <TouchableOpacity style={roleStyles.button} onPress={() => navigation.navigate("SignUpElder")}>
          <Text style={roleStyles.text}>Elderly Person</Text>
        </TouchableOpacity>
      </View>

      <View style={roleStyles.container}>
        <TouchableOpacity style={roleStyles.button} onPress={() => navigation.navigate("SignUpDoctor")}>
          <Text style={roleStyles.text}>Doctor</Text>
        </TouchableOpacity>
      </View>

      <View style={roleStyles.container}>
        <TouchableOpacity style={roleStyles.button} onPress={() => navigation.navigate("SignUpCareTaker")}>
          <Text style={roleStyles.text}>Caregiver</Text>
        </TouchableOpacity>
      </View>

      <View style={roleStyles.container}>
        <TouchableOpacity style={roleStyles.button} onPress={() => navigation.navigate("SignUpFamilyMember")}>
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
