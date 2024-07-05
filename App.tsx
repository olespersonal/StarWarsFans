import React from 'react';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import {PaperProvider} from 'react-native-paper';

const App = (): React.JSX.Element => {
  return (
    <PaperProvider>
      <MainStackNavigator />
    </PaperProvider>
  );
};

export default App;
