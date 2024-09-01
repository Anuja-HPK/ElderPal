import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import AppNavigation from './app/navigation';
import ElderDashboardScreen from './app/screens/ElderDashboardScreen';
import TheScreen from './app/screens/assistanthome';
import { CommonDBDoctor } from './app/screens/CommonDBDoctor';


const App = () => {
  return (
<AppNavigation/>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;