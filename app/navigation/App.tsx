// App.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MovieDetailScreen from '../../movies/screens/MovieDetailScreen';
import { RootStackParamList } from './types'; // Adjust the path accordingly
import MyDrawer from './NavDrawer';
import LoginScreen from '../../user/screens/LoginScreen';
import { ThemeProvider } from '../theme/ThemeContext';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ThemeProvider>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={MyDrawer} options={{ headerShown: false }} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Details' }} />
      </Stack.Navigator>
    </ThemeProvider>
  );
};

export default App;
