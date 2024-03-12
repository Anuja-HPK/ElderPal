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
