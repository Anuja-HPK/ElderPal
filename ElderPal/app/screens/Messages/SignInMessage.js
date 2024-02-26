import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

const SignInMessage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(false); // Hide the modal
      console.log('Navigate to the next screen'); // Placeholder for navigation action
      // navigation.navigate('NextScreenName'); // Uncomment and replace 'NextScreenName' with your actual next screen name
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Welcome! All the best for today.</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background for modal overlay
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#49d049',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
});
export default SignInMessage;