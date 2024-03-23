import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function ChooseRoleScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image
          source={require("../assets/back.png")} // Assuming you have a back arrow icon
          style={styles.backIcon}
        />
      </TouchableOpacity>

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

  backButton: {
    position: 'absolute',
    top: hp('2%'), // Adjusted to 2% of the screen height
    left: wp('2%'), // Adjusted to 2% of the screen width
    zIndex: 1,
  },

  backIcon: {
    width: wp('8%'), // Adjust according to your icon size preference
    height: wp('8%'), // Adjust according to your icon size preference
    tintColor: 'black', // Assuming your icon color is black
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
    marginTop: hp('5%'), // Adjusted to 5% of the screen height
    borderWidth: wp('0.5%'), // Adjusted to 3% of the screen width
    borderColor: '#000000',
    borderRadius: wp('20%'), // Adjusted to 20% of the screen width
  },

  logo: {
    width: wp('45%'), // Adjusted to 45% of the screen width
    height: wp('43%'), // Adjusted to 43% of the screen width
  },

  titleContainer: {
    marginBottom: hp('2%'), // Adjusted to 2% of the screen height
  },

  title: {
    fontSize: hp('4%'), // Adjusted to 4% of the screen height
    fontWeight: "600",
    color: "black",
  },

  buttonContainer: {
    alignItems: "center",
    borderRadius: wp('10%'), // Adjusted to 10% of the screen width
    padding: wp('5%'), // Adjusted to 5% of the screen width
    backgroundColor: "#90EE90",
    marginBottom: hp('2%'), // Adjusted to 2% of the screen height
    width: wp('70%'), // Adjusted to 70% of the screen width
    borderWidth: wp('0.5%'), // Adjusted to 2% of the screen width
  },

  buttonText: {
    color: "black",
    fontSize: hp('3%'), // Adjusted to 3% of the screen height
    fontWeight: "500",
  },
});
