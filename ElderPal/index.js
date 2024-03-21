import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Provider as ResponsiveProvider } from 'react-native-responsive-screen';
import AppNavigation from './app/navigation';

const App = () => {
  return (
    <AppNavigation />
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;