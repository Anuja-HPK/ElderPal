import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

export default function ChooseRoleScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.background} />
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/Logo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>I am,</Text>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("ElderSignUp")}>
        <Text style={styles.buttonText}>Elderly Person</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("DoctorSignUp")}>
        <Text style={styles.buttonText}>Doctor</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("CareTakerSignUp")}>
        <Text style={styles.buttonText}>Caregiver</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("FamilyMemberSignUp")}>
        <Text style={styles.buttonText}>Family Member</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#258e25',
    transform: [
      {
        skewY: '100deg'
      }
    ],
    zIndex: -1,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    borderWidth: 3,
    borderColor: '#000000',
    borderRadius: 100,
  },

  logo: {
    width: 170,
    height: 165,
  },

  titleContainer: {
    marginBottom: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: "600",
    color: "black",
  },

  buttonContainer: {
    alignItems: "center",
    borderRadius: 40,
    padding: 20,
    backgroundColor: "#90EE90",
    marginBottom: 20,
    width: 250,
    borderWidth: 2,
  },

  buttonText: {
    color: "black",
    fontSize: 24,
    fontWeight: "500",
  },
});
