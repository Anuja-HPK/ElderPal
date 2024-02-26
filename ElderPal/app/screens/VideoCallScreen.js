import React from 'react';
import { View, Text } from 'react-native';
import { AgoraUIKit } from 'agora-rn-uikit';

export default function VideoCallScreen ()  {
  const appId = '9a566ba079864955addea864bf436588';
  const channel = 'your_channel_name';

  const configuration = {
    appId,
    channel,
  };

  return (
    <View>
      <Text>Video Call Screen</Text>
      <AgoraUIKit configuration={configuration} />
    </View>
  );
};


