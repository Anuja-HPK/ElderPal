import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, StyleSheet, Alert,LogBox } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Features from '../components/Features';
import Voice from '@react-native-community/voice';
import { apiCall } from '../api/openAI';
import Tts from 'react-native-tts';

const AssistantHome = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const ScrollViewRef = useRef();

  const speechStartHandler = () => {
    console.log('speech start handler');
    setRecording(true);
  };

  const speechEndHandler = () => {
    console.log('speech end handler');
  };

  const speechResultsHandler = (e) => {
    console.log('voice event: ', e);
    const text = e.value[0];
    setResult(text);
    fetchResponse(text);
  };

  const speechErrorHandler = (e) => {
    console.log('speech error handler: ', e);
  };

  const startRecording = async () => {
    setRecording(true);
    Tts.stop();
    try {
      await Voice.start('en-GB');
    } catch (e) {
      console.log('error: ', e);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);
    } catch (e) {
      console.log('Recording Stop Error:', e);
      // Handle error appropriately, e.g., show an error message.
    }
  };

  const fetchResponse = (text) => {
    if (text.trim().length > 0) {
      let newMessages = [...messages];
      newMessages.push({ role: 'user', content: text.trim() });
      setMessages([...newMessages]);
      updateScrollView();
      setLoading(true);

      apiCall(text.trim(), newMessages).then(res => {
        setLoading(false);
        if (res.success) {
          setMessages([...res.data]);
          updateScrollView();
          setResult('');
          startTextToSpeech(res.data[res.data.length - 1]);
        } else {
          Alert.alert('Error', res.msg);
        }
      });
    } else {
      console.log('Empty result. Skipping fetch.');
    }
  };

  const startTextToSpeech = message => {
    stopRecording();
    if (!message.content.includes('https')) {
      setSpeaking(true);
      Tts.speak(message.content, {
        androidParams: {
          KEY_PARAM_PAN: -1,
          KEY_PARAM_VOLUME: 0.5,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
    }
  };

  const updateScrollView = () => {
    setTimeout(() => {
      ScrollViewRef?.current?.scrollToEnd({ animated: true })
    }, 200)
  };

  const clear = () => {
    setMessages([]);
    Tts.stop();
  };

  const stopSpeaking = () => {
    Tts.stop();
    setSpeaking(false);
  };

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    Tts.addEventListener('tts-start', (event) => console.log("start", event));
    Tts.addEventListener('tts-progress', (event) => console.log("progress", event));
    Tts.addEventListener('tts-finish', (event) => { console.log("finish", event); setSpeaking(false) });
    Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/back.png")} // Changed to back.png
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <Image source={require('../../app/assets/vaimages/bot.png')} style={styles.image} />
        </View>
        {messages.length > 0 ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageTitle}>Assistant</Text>
            <View style={styles.messageContent}>
              <ScrollView ref={ScrollViewRef} bounces={false} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {messages.map((message, index) => {
                  if (message.role === 'assistant') {
                    if (message.content.includes('https')) {
                      return (
                        <View key={index} style={styles.imgResBox}>
                          <View style={styles.imgResContainer}>
                            <Image
                              source={{ uri: message.content }}
                              style={styles.imgResStyle}
                              resizeMode="contain"
                            />
                          </View>
                        </View>
                      )
                    } else {
                      return (
                        <View style={styles.assistantMessage} key={index}>
                          <View style={styles.assistantMsgBox}>
                            <Text>{message.content}</Text>
                          </View>
                        </View>
                      );
                    }
                  } else {
                    return (
                      <View style={styles.userInput} key={index}>
                        <View style={styles.userInputBox}>
                          <Text>{message.content}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features />
        )}
        <View style={styles.buttonsContainer}>
          {loading ? (
            <Image
              source={require('../../app/assets/vaimages/loading.gif')}
              style={styles.loadingImage} />
          ) : (
            recording ? (
              <TouchableOpacity onPress={stopRecording}>
                <Image source={require('../../app/assets/vaimages/voiceLoading.gif')} style={styles.buttonImagegif} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={startRecording}>
                <Image source={require('../../app/assets/vaimages/recordingIcon.png')} style={styles.buttonImage} />
              </TouchableOpacity>
            )
          )}
          {messages.length > 0 && (
            <TouchableOpacity onPress={clear} style={styles.clearButton}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          )}
          {speaking && (
            <TouchableOpacity onPress={stopSpeaking} style={styles.stopButton}>
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};
LogBox.ignoreAllLogs();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: wp(5),
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(7),
  },
  image: {
    height: hp(15),
    width: hp(15),
  },
  messageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  messageTitle: {
    fontSize: wp(5),
    color: 'gray',
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  messageContent: {
    height: hp(58),
    backgroundColor: '#F3F4F6',
    borderRadius: wp(4),
    padding: wp(4),
    marginBottom: hp(10),
  },
  scrollView: {
    flex: 1,
    marginVertical: wp(1),
  },
  assistantMessage: {
    marginBottom: hp(1),
  },
  userInput: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: hp(1),
  },
  userInputBox: {
    width: wp(70),
    backgroundColor: '#D1FAE5',
    borderRadius: wp(4),
    padding: wp(2),
    marginTop: hp(1.5),
  },
  assistantMsgBox: {
    width: wp(70),
    backgroundColor: 'white',
    borderRadius: wp(4),
    padding: wp(2),
    marginTop: hp(1.5),
  },
  imgResBox: {
    flexDirection: 'row',
    justifyContent: 'start',
  },
  imgResContainer: {
    marginTop: hp(1),
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  imgResStyle: {
    borderRadius: 20,
    height: wp(60),
    width: wp(60),
  },
  loadingImage: {
    width: hp(10),
    height: hp(10),
  },
  buttonsContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    height: hp(12),
    width: hp(12),
    borderRadius: hp(5),
  },
  buttonImagegif: {
    height: hp(12),
    width: hp(12),
    borderRadius: hp(8),
  },
  clearButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: wp(8),
    padding: wp(2),
    position: 'absolute',
    right: wp(10),
  },
  stopButton: {
    backgroundColor: '#EF4444',
    borderRadius: wp(8),
    padding: wp(2),
    position: 'absolute',
    left: wp(10),
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: hp('2%'), // Adjusted to 2% of the screen height
    left: wp('2%'), // Adjusted to 2% of the screen width
    zIndex: 1,
  },

  backIcon: {
    width: wp('8%'),
    height: wp('8%'),
    tintColor: 'green',
  },
});

export default AssistantHome;
