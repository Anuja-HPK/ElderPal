import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import React, { useEffect } from 'react';

import LogInScreen from "../../app/screens/LogInScreeen";
import ChooseRoleScreen from "../../app/screens/ChooseRoleScreen";
import ElderSignUp from "../../app/screens/ElderSignUp";
import DoctorSignUp from "../../app/screens/DoctorSignUp";
import CareTakerSignUp from "../../app/screens/CareTakerSignUp";
import FamilyMemberSignUp from "../../app/screens/FamilyMemberSignUp";
import TodoList from "../../app/screens/TodoList";
import { CommonDBDoctor, NotesUpdate } from '../../app/screens/CommonDBDoctor';
import { CommonDBDCaretaker, CTNotesUpdate } from '../../app/screens/CommonDBCaretaker';
import CommonDBFamilyMem from '../../app/screens/CommonDBFamilyMem';
import WelcomeScreen from "../../app/screens/WelcomeScreen";
import ElderDashboardScreen from "../../app/screens/ElderDashboardScreen";
import SignInScreen from "../../app/screens/SignInScreen";
import ElderProfileScreen from "../../app/screens/Profile_Section/ElderProfileScreen";
import DoctorProfileScreen from "../../app/screens/Profile_Section/DoctorProfileScreen";
import CareTakerProfileScreen from "../../app/screens/Profile_Section/CareTakerProfileScreen";
import FamilyMemberProfileScreen from "../../app/screens/Profile_Section/FamilyMemberProfileScreen";
import ElderEditScreen from "../../app/screens/Edit_Profile_Section/ElderEditScreen";
import DoctorEditScreen from "../../app/screens/Edit_Profile_Section/DoctorEditScreen";
import CareTakerEditScreen from "../../app/screens/Edit_Profile_Section/CareTakerEditScreen";
import FamilyEditScreen from "../../app/screens/Edit_Profile_Section/FamilyEditScreen";
import SettingScreen from "../../app/screens/Settings/SettingScreen";
import Logout from "../../app/screens/Messages/Logout";
import SignInMessage from "../../app/screens/Messages/SignInMessage";
import SignUpMessage from "../../app/screens/Messages/SignUpMessage";
import AssistantHome from "../../app/screens/assistanthome";
import CallingUIScreen from "../../app/screens/CallingUIScreen";
import VideoCall from "../../app/screens/VideoCall";
import StartCall from "../../app/screens/StartCall";
import {
    ZegoCallInvitationDialog,
    ZegoUIKitPrebuiltCallWaitingScreen,
    ZegoUIKitPrebuiltCallInCallScreen,
  } from '@zegocloud/zego-uikit-prebuilt-call-rn';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    // Initialize Firebase Firestore and Firebase Auth
    firestore();
    auth();

    const [initialRouteName, setInitialRouteName] = useState('Welcome');

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in, determine the role and set appropriate initial route
                const role = user.role; // Assuming you have stored user's role in Firebase user object
                switch (role) {
                    case 'elder':
                        setInitialRouteName('ElderDB');
                        break;
                    case 'doctor':
                        setInitialRouteName('DoctorDB');
                        break;
                    case 'familyMember':
                        setInitialRouteName('FamilyMemberDB');
                        break;
                    case 'caretaker':
                        setInitialRouteName('CareTakerDB');
                        break;
                    default:
                        setInitialRouteName('Welcome'); // Default route
                        break;
                }
            } else {
                // No user is signed in, set default initial route
                setInitialRouteName('Welcome');
            }
        });

        return unsubscribe; // Cleanup function
    }, []);

    return (
        <NavigationContainer>
            <ZegoCallInvitationDialog />
            
            <Stack.Navigator initialRouteName={initialRouteName}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="login" component={LogInScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} options={{ headerShown: false }} />

                {/* Conditional rendering of signup screens based on the chosen role */}
                <Stack.Screen name="ElderSignUp" component={ElderSignUp} options={{ headerShown: false }} />
                <Stack.Screen name="DoctorSignUp" component={DoctorSignUp} options={{ headerShown: false }} />
                <Stack.Screen name="CareTakerSignUp" component={CareTakerSignUp} options={{ headerShown: false }} />
                <Stack.Screen name="FamilyMemberSignUp" component={FamilyMemberSignUp} options={{ headerShown: false }} />

                <Stack.Screen name="ElderDB" component={ElderDashboardScreen} options={{ headerShown: false }} />
                <Stack.Screen name="DoctorDB" component={CommonDBDoctor} options={{ headerShown: false }} />
                <Stack.Screen name="CareTakerDB" component={CommonDBDCaretaker} options={{ headerShown: false }} />
                <Stack.Screen name="CareTakerPF" component={CareTakerProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CareTakerEdit" component={CareTakerEditScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CTNotesUpdate" component={CTNotesUpdate} />
                <Stack.Screen name="FamilyMemberDB" component={CommonDBFamilyMem} options={{ headerShown: false }} />

                {/* Other screens  */}
                <Stack.Screen name="ElderPF" component={ElderProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ElderEdit" component={ElderEditScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AIassistant" component={AssistantHome} options={{ headerShown: false }} />
                <Stack.Screen name="Call" component={VideoCall} options={{ headerShown: false }} />
                <Stack.Screen name="ToDo" component={TodoList} options={{ headerShown: false }} />

                <Stack.Screen name="ZegoUIKitPrebuiltCallWaitingScreen" component={ZegoUIKitPrebuiltCallWaitingScreen} options={{headerShown: false}} />
                <Stack.Screen name="ZegoUIKitPrebuiltCallInCallScreen" component={ZegoUIKitPrebuiltCallInCallScreen} options={{headerShown: false}} />
                <Stack.Screen name="StartCall" component={StartCall} options={{ headerShown: false }} />
          
                <Stack.Screen name="NotesUpdate" component={NotesUpdate} />
                <Stack.Screen name="DoctorPF" component={DoctorProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name="DoctorEdit" component={DoctorEditScreen} />

                <Stack.Screen name="FamilyMemberPF" component={FamilyMemberProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name="FamilyEdit" component={FamilyEditScreen} />

                <Stack.Screen name="Setting" component={SettingScreen} />
                <Stack.Screen name="Logout" component={Logout} />
                <Stack.Screen name="SignInMessage" component={SignInMessage} />
                <Stack.Screen name="SignUpMessage" component={SignUpMessage} />
                <Stack.Screen name="AssistantHome" component={AssistantHome} />
                <Stack.Screen name="CallingUIScreen" component={CallingUIScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigation;
