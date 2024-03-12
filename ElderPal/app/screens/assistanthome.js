import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Features from '../components/Features';
import { dummyMessages } from '../constants/index';
import Voice from '@react-native-community/voice';
import { apiCall } from '../api/openAI';
import Tts from 'react-native-tts';

const HomeScreen = () => {
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const startTextToSpeech = message => {
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
        }
        useEffect(() => {
          // voice handler events
          Voice.onSpeechStart = speechStartHandler;
          Voice.onSpeechEnd = speechEndHandler;
          Voice.onSpeechResults = speechResultsHandler;
          Voice.onSpeechError = speechErrorHandler;
      
          //tts handlers
          Tts.addEventListener('tts-start', (event) => console.log("start", event));
          Tts.addEventListener('tts-progress', (event) => console.log("progress", event));
          Tts.addEventListener('tts-finish', (event) => { console.log("finish", event); setSpeaking(false) });
          Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));
      
          return () => {
            // voice instant remover
            Voice.destroy().then(Voice.removeAllListeners);
          };
        }, []);

const clear = () => {
          setMessages([]);
          Tts.stop();
      
        };
      
        const fetchResponse = () => {
          if (result.trim().length > 0) {
      
            let newMessages = [...messages];
            newMessages.push({ role: 'user', content: result.trim() });
            setMessages([...newMessages]);
            updateScrollView();
            setLoading(true);
      
            apiCall(result.trim(), newMessages).then(res => {
              //console.log('Got API Data:', res);
              setLoading(false);
              if (res.success) {
                setMessages([...res.data]);
                updateScrollView();
                setResult('');
                startTextToSpeech(res.data[res.data.length - 1]);
              } else {
                Alert.alert('Error', res.msg);
              }        
const stopRecording = async () => {
          try {
            await Voice.stop();
            setRecording(false);
            // Fetch response after stopping recording
            fetchResponse();
          } catch (e) {
            console.log('Recording Stop Error:', e);
            // Handle error appropriately, e.g., show an error message.
          }
        };
      
      
      
const updateScrollView = () => {
          setTimeout(() => {
            ScrollViewRef?.current?.scrollToEnd({ animated: true })
          }, 200)
        }
      

  
const stopSpeaking = () => {
          Tts.stop();
          setSpeaking(false);
        };
  const speechStartHandler = () => {
          console.log('speech start handler');
        };
      
        const speechEndHandler
  const stopSpeaking = () => {
          Tts.stop();
          setSpeaking(false);
        };

   = () => {
    setRecording(false);
    console.log('speech end handler');
  };

  const speechResultsHandler = (e) => {
    console.log('voice event: ', e);
    const text = e.value[0];
    setResult(text);
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

  

  

      });
    } else {
      console.log('Empty result. Skipping fetch.');
    }
  };



  

  

  

  

  //console.log('result: ', result);

  return (
          <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/bot.png')} style={styles.image} />
        </View>
    
        {/* features and messages */}
        {messages.length > 0 ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageTitle}>Assistant</Text>
            <View style={styles.messageContent}>

              <ScrollView ref={ScrollViewRef} bounces={false} style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {messages.map((message, index) => {
                  if (message.role === 'assistant') {
                    if (message.content.includes('https')) {
                      // dall e image response 
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
                      //text response chatgpt
                      return (
                        <View style={styles.assistantMessage} key={index}>
                          <View style={styles.assistantMsgBox}>
                            <Text>{message.content}</Text>
                          </View>
                        </View>
                      );
                    }

                  } else {
                    //user Input
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
        {/* 3 buttons for recording, clear, and stop */}
        <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/bot.png')} style={styles.image} />
        </View>
        
        <View style={styles.buttonsContainer}>
          {
            loading ? (
              <Image
                source={require('../../assets/images/loading.gif')}
                style={styles.loadingImage} />

            ) :
              recording ? (
                <TouchableOpacity onPress={stopRecording}>
                  <Image source={require('../../assets/images/voiceLoading.gif')} style={styles.buttonImage} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={startRecording}>
                  <Image source={require('../../assets/images/recordingIcon.png')} style={styles.buttonImage} />
                </TouchableOpacity>
              )


          }

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
                  imgResBox: {     // for dalle image response 
                    flexDirection: 'row',
                    justifyContent: 'start',
                  },
                  imgResContainer: { // for dalle image response 
                    marginTop: hp(1),
                    padding: 0,
                    backgroundColor: 'white',
                    borderRadius: 20,
                  },
                  imgResStyle: {  // for dalle  image response 
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
                    height: hp(10),
                    width: hp(10),
                    borderRadius: hp(5),
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
                  buttonText: {
                    color: 'white',
                    fontWeight: 'bold',
                  },
                });
                
                export default HomeScreen;
          

