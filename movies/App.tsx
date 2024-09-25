// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // Adjust the path accordingly 
import MovieListScreen from './screens/MovieListScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';
import { RootStackParamList } from '../app/navigation/types';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MovieListScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
