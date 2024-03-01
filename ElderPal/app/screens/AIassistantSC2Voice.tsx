import Voice, { } from '@react-native-voice/voice';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Platform, PermissionsAndroid, Rationale, TouchableHighlight, SafeAreaView, TouchableOpacityBase, TouchableOpacity, StyleSheet  } from 'react-native';
import { getAnswerFromGpt } from '../services/OpenAiService';
import {
  Bubble,
  GiftedChat,
  IMessage,
  Send,
} from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TypingAnimation } from 'react-native-typing-animation';
import { useSelector } from 'react-redux';
import Tts from 'react-native-tts';
import { initTts, readText } from '../utils/ttsUtils';


const initialMessages: IMessage[] =
  [
    {
      _id: 1,
      text: 'Hi there! How can I assist you today?',
      createdAt: new Date(),
      system: true,
      user: { _id: 1 }
    },
  ];



const ChatWithVoiceScreen = () => {
  const [recording, setRecording] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [answering, setAnswering] = useState(false);
  const [result, setResult] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [ttsStatus, setTtsStatus] = useState('');


  const voice = useSelector((state: any) => state.voice.value);

  const onSend = useCallback((messages: IMessage[] = []) => {
    const { text, } = messages[0];
    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, messages, Platform.OS !== 'web');
    })
    processTranscription(text);
  }, []);



  useEffect(() => {


    Voice.onSpeechStart = (e) => {
      setErrorMsg('');
      setRecording(true);
    };

    Voice.onSpeechEnd = (e) => {
      setRecording(false);
    };


    Voice.onSpeechError = (e: any) => {
      const errMsg: string = e.error?.message;

      if (errMsg.includes('No match')) {
        setErrorMsg("You are not speaking!");
      } else {
        setErrorMsg(errMsg);
      }

      setRecording(false);
    }

    Voice.onSpeechResults = (e: any) => {
      const prompt = e.value[0];
      if (!prompt) {
        return;
      }
      setResult(prompt);
    };


    setMessages(initialMessages);


    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      Tts.stop();
    };
  }, []);


  const stopRecording = async () => {

    console.log("== stopRecording ");

    try {
      await Voice.stop();
      setRecording(false);

      console.log("== stopRecording: ", result);

      const newMsg = {
        _id: Math.round(Math.random() * 1000000),
        text: result,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'User',
        }
      };

      const newMessage = [newMsg]

      setMessages((previousMessages) => {
        return GiftedChat.append(previousMessages, newMessage, Platform.OS !== 'web');
      })

      if (result) {
        processTranscription(result);
      }

    } catch (error: any) {
      console.log("== eror when stop: ", error);
      setErrorMsg(error.message)
    }

  }

  const startRecording = async () => {

    console.log("== startRecording ");
    setRecording(true);
    Tts.stop();

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };


  const stopSpeaking = () => {
    Tts.stop();
    setSpeaking(false);
  }

  const readTheAnswer = (message: string) => {
    setSpeaking(true);
    readText(message);
  }

  const processTranscription = async (prompt: string) => {


    if (prompt.trim().length > 0) {

      setAnswering(true);
      getAnswerFromGpt(prompt.trim()).then((res: any) => {

        if (res.success) {
          setAnswering(false);

          const newMsg = {
            _id: Math.round(Math.random() * 1000000),
            text: res.data,
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'Assistant',
            }
          };

          const newMessage = [newMsg]
          setMessages((previousMessages) => {
            return GiftedChat.append(previousMessages, newMessage, Platform.OS !== 'web');
          })

          if (voice) {
            readTheAnswer(res.data);
          }

        } else {
          setAnswering(false);
          setErrorMsg(res.msg);

        }

      })
    }


  }



  const renderSend = (props: any) => {
    return (
      <>
        <Send {...props}>
          <MaterialCommunityIcons name="send"
            style={styles.buttonSend}
          />
        </Send>
        <TouchableOpacity
          style={styles.buttonMicStyle}
          onPress={recording ? stopRecording : startRecording}>
          {recording ?
            <MaterialCommunityIcons name='stop' style={styles.buttonRecordingOff} /> :
            <MaterialCommunityIcons name='microphone' style={styles.buttonRecordingOn} />}
        </TouchableOpacity>
      </>
    );
  };

  const scrollToBottomComponent = () => {
    return <MaterialCommunityIcons name="arrow-down-circle-outline" size={38} color="#10a37f" />;
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 38,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#10a37f'
    },
    subtitle: {
      fontSize: 12,
      color: '#666',
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#10a37f',
      paddingVertical: 5,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 18,
    },
  });




  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.container}>


        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          onSend={messages => onSend(messages)}
          user={{
            _id: 2,
            name: 'User',
            avatar: ''
          }}
          alwaysShowSend
          renderSend={renderSend}
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
        />



      </View>
    </SafeAreaView>
  );
 
  


export default ChatWithVoiceScreen;