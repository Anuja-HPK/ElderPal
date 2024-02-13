import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SignInScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const backgroundImage = require("../assets/Elder care person.jpg");

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
        <Text style={styles.title}>Sign In</Text>

        <Text style={styles.label}>Username</Text>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="account"
            size={30}
            color="#fff"
            style={styles.icon}
          />
          <TextInput
            style={[styles.input]}
            placeholder="Enter Your Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#fff"
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Enter Your Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            placeholderTextColor="#fff"
          />

          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <MaterialCommunityIcons
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="#00b33c"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              /* Navigate to Sign Up */
            }}
          >
            <Text style={styles.signupButton}> Sign Up Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#00b33c",
    borderRadius: 90,
  },

  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  title: {
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },

  label: {
    alignSelf: "flex-start",
    marginLeft: "5%",
    fontSize: 20,
    fontWeight: "bold",
    color: "#4dff88",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    margin: 12,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#000000",
  },

  icon: {
    position: "absolute",
    right: 10,
    color: "#00b33c",
  },

  input: {
    width: "90%",
    height: 50,
    padding: 10,
    color: "#fff",
  },

  passwordInput: {
    flex: 1,
    marginRight: 44,
    color: "#fff",
  },

  eyeIcon: {
    position: "absolute",
    right: 10,
  },

  button: {
    width: "60%",
    alignItems: "center",
    backgroundColor: "#00b33c",
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

  signupContainer: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  signupText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  signupButton: {
    fontSize: 18,
    color: "#4dff88",
    fontWeight: "bold",
  },
});

export default SignInScreen;
