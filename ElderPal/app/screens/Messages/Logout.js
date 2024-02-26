import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Confirmation Modal
const LogoutConfirmationModal = ({ isVisible, onConfirm, onCancel }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={isVisible}
    onRequestClose={onCancel}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Are you sure you want to logout?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonConfirm]} onPress={onConfirm}>
            <Text style={styles.textStyle}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={onCancel}>
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

// Message Modal
const LogoutMessageModal = ({ isVisible, onClose }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={isVisible}
    onRequestClose={onClose}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>You have been logged out. See you next time!</Text>
        <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={onClose}>
          <Text style={styles.textStyle}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const App = () => {
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [messageModalVisible, setMessageModalVisible] = useState(false);
  
    const handleLogoutConfirm = () => {
      setConfirmModalVisible(false); // Close the confirmation modal
      setMessageModalVisible(true); // Open the message modal
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.upperHalfBackground} />
        <View style={styles.centerContent}>
          <TouchableOpacity onPress={() => setConfirmModalVisible(true)} style={styles.showModalButton}>
            <Text style={styles.textStyle}>Do you want to Logout?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomHalfBackground} />

        <LogoutConfirmationModal
          isVisible={confirmModalVisible}
          onConfirm={handleLogoutConfirm}
          onCancel={() => setConfirmModalVisible(false)}
        />
        <LogoutMessageModal
          isVisible={messageModalVisible}
          onClose={() => setMessageModalVisible(false)}
        />
      </View>
    );
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  upperHalfBackground: {
    backgroundColor: '#258e25',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '30%',
    width: '100%',
    borderBottomRightRadius: 500,
  },

  bottomHalfBackground: {
    backgroundColor: '#258e25',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    width: '100%',
    borderTopLeftRadius: 500, // Adjust as needed
  },

  showModalButton: {
    backgroundColor: '#49d049', // Blue button to show the modal
    padding: 10,
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  buttonClose: {
    backgroundColor: '#49d049', // Red color for the close button
  },
  textStyle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black', // Black color for the text
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  buttonConfirm: {
    backgroundColor: '#49d049',
  },
  buttonCancel: {
    backgroundColor: '#f44336',
  }
});

export default App;
