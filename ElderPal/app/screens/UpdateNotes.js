import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const UpdateNotes = () => {
  return (
    <View style={styles.container}>
      <View style={styles.upperHalfBackground}>

      <TouchableOpacity /*onPress={() => navigation.goBack()}*/ style={styles.backButtonStyle}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Elder Profile</Text>


      </View>

      

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>asdf</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>asdf</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>asdf</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>asdf</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => {}}>
          <Text style={[styles.buttonText, styles.logoutButtonText]}>Logout</Text>
          <Text style={[styles.buttonArrow, styles.logoutButtonText]}>→</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};




export default UpdateNotes;
