import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  LogBox,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFirstInstallTime} from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const Stack = createNativeStackNavigator();

const keycenter = {
  appID: 222143934,
  appSign: '3ca8ffe35c3cf47879ed36513634467acd285c89bb23dbeb0ec805c4336f8c7a',
};

const storeUserInfo = async info => {
  await AsyncStorage.setItem('userID', info.userID);
  await AsyncStorage.setItem('userName', info.userName);
};
const getUserInfo = async () => {
  try {
    const userID = await AsyncStorage.getItem('userID');
    const userName = await AsyncStorage.getItem('userName');
    if (userID == undefined) {
      return undefined;
    } else {
      return {userID, userName};
    }
  } catch (e) {
    return undefined;
  }
};

const onUserLogin = async (userID, userName) => {
  return ZegoUIKitPrebuiltCallService.init(
    keycenter.appID,
    keycenter.appSign,

    userID,
    userName,
    [ZIM, ZPNs],
    {
      ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.mp3',
          outgoingCallFileName: 'zego_outgoing.mp3',
      },
      androidNotificationConfig: {
        channelID: 'ZegoUIKit',
        channelName: 'ZegoUIKit',
      },
    },
  );
};
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <NavigationContainer>
      <ZegoCallInvitationDialog />

      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        <Stack.Screen
          options={{headerShown: false}}
          name="ZegoUIKitPrebuiltCallWaitingScreen"
          component={ZegoUIKitPrebuiltCallWaitingScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ZegoUIKitPrebuiltCallInCallScreen"
          component={ZegoUIKitPrebuiltCallInCallScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoginScreen() {
  const navigation = useNavigation();
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');

  const loginHandler = () => {
    storeUserInfo({userID, userName});

    onUserLogin(userID, userName).then(() => {
      navigation.navigate('HomeScreen', {userID});
    });
  };

  useEffect(() => {
    getFirstInstallTime().then(firstInstallTime => {
      const id = String(parseInt(firstInstallTime)).slice(-5);
      setUserID(id);
      const name = 'user_' + id;
      setUserName(name);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 30}}>
        <Text>appID: {keycenter.appID}</Text>
        <Text>userID: {userID}</Text>
        <Text>userName: {userName}</Text>
      </View>
      <View style={{width: 160}}>
        <Button title="Login" onPress={loginHandler}></Button>
      </View>
    </View>
  );
}

function HomeScreen({navigation}) {
  const [userID, setUserID] = useState('');
  const [invitees, setInvitees] = useState([]);
  const viewRef = useRef(null);

  const blankPressedHandle = () => {
    viewRef.current.blur();
  };

  const changeTextHandle = value => {
    setInvitees(value ? value.split(',') : []);
  };

  useEffect(() => {
    getUserInfo().then(info => {
      if (info) {
        setUserID(info.userID);
        onUserLogin(info.userID, info.userName);
      } else {
        navigation.navigate('LoginScreen');
      }
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={blankPressedHandle}>
      <View style={styles.container}>
        <Text>Your user id: {userID}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            ref={viewRef}
            style={styles.input}
            onChangeText={changeTextHandle}
            placeholder="Invitees ID, Separate ids by ','"
          />
          <ZegoSendCallInvitationButton
            invitees={invitees.map(inviteeID => {
              return {userID: inviteeID, userName: 'user_' + inviteeID};
            })}
            isVideoCall={false}
            resourceID={'zego_call'}
          />
          <ZegoSendCallInvitationButton
            invitees={invitees.map(inviteeID => {
              return {userID: inviteeID, userName: 'user_' + inviteeID};
            })}
            isVideoCall={true}
            resourceID={'zego_call'}
          />
        </View>
        <View style={{width: 220, marginTop: 100}}>
          <Button
            title="Back To Login Screen"
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}></Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
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
});

