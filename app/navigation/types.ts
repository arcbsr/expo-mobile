// navigation/types.ts
import { ParamListBase } from '@react-navigation/native';

// Define your parameter list for navigation
export type RootStackParamList = {
  LoginScreen: undefined; // No params expected
  Home: undefined; // No params expected
  MovieDetail: { movieId: string }; // Expecting movieId as a string
};
