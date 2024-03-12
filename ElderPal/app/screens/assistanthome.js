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
          
});

export default HomeScreen;
