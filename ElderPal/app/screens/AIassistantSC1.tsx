
// Import necessary components and libraries
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const WelcomeScreen = () => {

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const handleNext = () => {
    navigation.navigate('ChatWithVoiceScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>React Native Voice Assistant</Text>
          <Text style={styles.subtitle}>With Voice Command powered by OpenAI</Text>
        </View>
        <MaterialCommunityIcons name="account-tie-voice" size={200}
          style={{ marginBottom: 10, marginRight: 10, color: '#10a37f' }}
        />

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Start Chat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 38,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#10a37f'
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#10a37f',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});


export default WelcomeScreen;