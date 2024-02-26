import { AppRegistry  } from "react-native";
import { name as appName } from './app.json';
import LogInScreen from "./app/screens/LogInScreeen";
import ChooseRoleScreen from "./app/screens/ChooseRoleScreen";
import ElderSignUp from  "./app/screens/ElderSignUp";
import TodoList from "./app/screens/TodoList";
import CommonDBDoctor from "./app/screens/CommonDBDoctor";
import WelcomeScreen from "./app/screens/WelcomeScreen";


AppRegistry.registerComponent(appName, () => App)
export default function App() {
  return (
    <>
      <CommonDBDoctor />
    </>
  );
}