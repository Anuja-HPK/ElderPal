
import { name as appName } from '../../app.json';
import { ThemeProvider } from "../../app/screens/Settings/ThemeContext";

import LogInScreen from "../../app/screens/LogInScreeen";
import ChooseRoleScreen from "../../app/screens/ChooseRoleScreen";
import ElderSignUp from "../../app/screens/ElderSignUp";
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
import OthersSignUpScreen from "../../app/screens/OthersSignUpScreen";
import AssistantHome from "../../app/screens/assistanthome";
import CallingUIScreen from "../../app/screens/CallingUIScreen";
import DoctorSignUp from "../../app/screens/DoctorSignUp";
import FamilyMemberSignUp from '../../app/screens/FamilyMemberSignUp';
import CareTakerSignUp from "../../app/screens/CareTakerSignUp";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    // Initialize Firebase Firestore and Firebase Auth
    firestore();
    auth();
    
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="EldersDB">
                <Stack.Screen name="ElderDB" component={ElderDashboardScreen} />
                <Stack.Screen name="ElderPF" component={ElderProfileScreen} />
                <Stack.Screen name="AIassistant" component={AssistantHome} />
                <Stack.Screen name="Call" component={CallContacts} />
                <Stack.Screen name="ToDo" component={TodoList} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}
export default AppNavigation;