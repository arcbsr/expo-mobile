// App.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MovieDetailScreen from '../../movies/screens/MovieDetailScreen';
import { RootStackParamList } from './types'; // Adjust the path accordingly
import MyDrawer from './NavDrawer';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MyDrawer} options={{ headerShown: false }}/>
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Details' }} />
      </Stack.Navigator>
  );
};

export default App;
