// LoginScreen.tsx

import { RootStackParamList } from '@/app/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';

type LoginScreenProp = {
    navigation: StackNavigationProp<RootStackParamList, 'LoginScreen'>;
  };
const LoginScreen: React.FC<LoginScreenProp> = ({navigation}) => {
  const handleGoogleLogin = () => {
    // Handle Google login here
    navigation.replace('Home');
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login here
    navigation.replace('Home'); 
  };

  const handleMicrosoftLogin = () => {
    // Handle Microsoft login here
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Welcome Back!" />
        <Card.Content>
          <TextInput
            label="Email"
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />
          <Button mode="contained" style={styles.button}>
            Login
          </Button>
          <Text style={styles.orText}>OR</Text>
          <Button
            mode="outlined"
            onPress={handleGoogleLogin}
            style={styles.socialButton}
          >
            Login with Google
          </Button>
          <Button
            mode="outlined"
            onPress={handleFacebookLogin}
            style={styles.socialButton}
          >
            Login with Facebook
          </Button>
          <Button
            mode="outlined"
            onPress={handleMicrosoftLogin}
            style={styles.socialButton}
          >
            Login with Microsoft
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 16,
    borderRadius: 10,
    elevation: 3,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: '#888',
  },
  socialButton: {
    marginBottom: 10,
  },
});

export default LoginScreen;
