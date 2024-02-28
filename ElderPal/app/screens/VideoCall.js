import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {Text} from 'react-native';

export default function App()  {
  const [videoCall, setVideoCall] = useState(true);
  const connectionData = {
    appId: '245e246ada564dc8a9016e39a417303a',
    channel: 'test',
  };
  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
  };
  return videoCall ? (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
  ) : (
    <Text onPress={() => setVideoCall(true)} style={{fontSize: 25, borderWidth:1, borderColor:'#258e25', padding:20, marginLeft:50, marginTop: 40, marginRight:50}}>
      Call Again
    </Text>
  );
};


