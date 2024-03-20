
import { name as appName } from '../../app.json';
import { ThemeProvider } from "../../app/screens/Settings/ThemeContext";

import LogInScreen from "../../app/screens/LogInScreeen";
import ChooseRoleScreen from "../../app/screens/ChooseRoleScreen";
import ElderSignUp from "../../app/screens/ElderSignUp";
import DoctorSignUp from "../../app/screens/DoctorSignUp";
import CareTakerSignUp from "../../app/screens/CareTakerSignUp";
import FamilyMemberSignUp from "../../app/screens/FamilyMemberSignUp";
import TodoList from "../../app/screens/TodoList";
import CommonDBDoctor from "../../app/screens/CommonDBDoctor";
import CommonDBCaretaker from '../../app/screens/CommonDBCaretaker';
import CommonDBFamilyMem from '../../app/screens/CommonDBFamilyMem';
import WelcomeScreen from "../../app/screens/WelcomeScreen";
import ElderDashboardScreen from "../../app/screens/ElderDashboardScreen";
import CallContacts from "../../app/screens/CallContacts";
import SignInScreen from "../../app/screens/SignInScreen";
import SignUpScreen from "../../app/screens/ElderSignUp";
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

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    // Initialize Firebase Firestore and Firebase Auth
    firestore();
    auth();

    const [initialRouteName, setInitialRouteName] = useState('SignIn');

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
                        setInitialRouteName('CaretakerDB');
                        break;
                    default:
                        setInitialRouteName('SignIn'); // Default route
                        break;
                }
            } else {
                // No user is signed in, set default initial route
                setInitialRouteName('SignIn');
            }
        });

        return unsubscribe; // Cleanup function
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRouteName}>

                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} />

                <Stack.Screen name="SignUpElder" component={ElderSignUp} />
                <Stack.Screen name="SignUpDoctor" component={DoctorSignUp} />
                <Stack.Screen name="SignUpCareTaker" component={CareTakerSignUp} />
                <Stack.Screen name="SignUpFamilyMember" component={FamilyMemberSignUp} />

                <Stack.Screen name="ElderDB" component={ElderDashboardScreen} />
                <Stack.Screen name="DoctorDB" component={CommonDBDoctor} />
                <Stack.Screen name="CareTakerDB" component={CommonDBCaretaker} />
                <Stack.Screen name="FamilyMemberDB" component={CommonDBFamilyMem} />


                {/* elder dashboard buttons */}
                <Stack.Screen name="ElderPF" component={ElderProfileScreen} />
                <Stack.Screen name="ElderEdit" component={ElderEditScreen} />
                <Stack.Screen name="AIassistant" component={AssistantHome} />
                <Stack.Screen name="Call" component={CallContacts} />
                <Stack.Screen name="ToDo" component={TodoList} />


                <Stack.Screen name="DoctorPF" component={DoctorProfileScreen} />
                <Stack.Screen name="DoctorEdit" component={DoctorEditScreen} />

                <Stack.Screen name="CareTakerPF" component={CareTakerProfileScreen} />
                <Stack.Screen name="CareTakerEdit" component={CareTakerEditScreen} />

                <Stack.Screen name="FamilyMemberPF" component={FamilyMemberProfileScreen} />
                <Stack.Screen name="FamilyMemberEdit" component={FamilyEditScreen} />

                <Stack.Screen name="Settings" component={SettingScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigation;