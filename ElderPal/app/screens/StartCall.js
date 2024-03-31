import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';

export default function StartCall({ navigation, route }) {
  const [invitees, setInvitees] = useState([]);
  const viewRef = useRef(null);
  const { inviteeID } = route.params;

  useEffect(() => {
    setInvitees([inviteeID]); 
  }, [inviteeID]); 

  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Image source={require('../assets/back.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <ZegoSendCallInvitationButton
            invitees={invitees.map(inviteeID => {
              return {userID: inviteeID, userName: 'user_' + inviteeID};
            })}
            isVideoCall={false}
            resourceID={'zego_call'}
          />
          <View style={{ width: 10 }} />
          <ZegoSendCallInvitationButton
            invitees={invitees.map(inviteeID => {
              return {userID: inviteeID, userName: 'user_' + inviteeID};
            })}
            isVideoCall={true}
            resourceID={'zego_call'}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#258e25',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  backButton: {
    position: 'absolute',
    top: hp('2%'), 
    left: wp('2%'), 
    zIndex: 1,
  },
  backIcon: {
    width: wp('8%'),
    height: wp('8%'),
    tintColor: 'black',
  },
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
