import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigation } from './src/navigation/RootNavigation';
import IssueProvider from './src/store/issue-context';

const App = () => {
  return (
    <NavigationContainer>
      <IssueProvider>
        <RootNavigation />
      </IssueProvider>
    </NavigationContainer>
  );
};

export default App;
