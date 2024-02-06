import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function ChooseRoleScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#199BC3" }}>
      <View
        style={{
          alignItems: "center",
          marginVertical: 110,
        }}
      >
        <Image
          source={require("../assets/Logo.png")}
          style={{ width: 170, height: 165 }}
        />
      </View>
      <View style={{ marginVertical: -100 }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 600,
            marginLeft: 30,
            color: "#ffff",
          }}
        >
          I am,
        </Text>
      </View>
      <View
        style={{
          marginVertical: 130,
          borderRadius: 20,
          margin: 45,
          padding: 20,
          backgroundColor: "#fff",
        }}
      >
        <TouchableOpacity style={{ alignItems: "center" }}>
          <Text style={roleStyles.styles}>Elderly Person</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            marginVertical: -100,
            borderRadius: 20,
            margin: 45,
            padding: 20,
            backgroundColor: "#fff",
          }}
        >
          <Text style={roleStyles.styles}>Doctor</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            marginVertical: 10,
            borderRadius: 20,
            margin: 45,
            padding: 20,
            backgroundColor: "#fff",
          }}
        >
          <Text style={roleStyles.styles}>Caregiver</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            marginVertical: 25,
            borderRadius: 20,
            margin: 45,
            padding: 20,
            backgroundColor: "#fff",
          }}
        >
          <Text style={roleStyles.styles}>Family Member</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const roleStyles = {
  styles: {
    color: "black",
    fontSize: 28,
    fontWeight: 500,
  },
};
