// LoginScreen.tsx

import { RootStackParamList } from '@/app/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';

type LoginScreenProp = {
  navigation: StackNavigationProp<RootStackParamList, 'LoginScreen'>;
};

const LoginScreen: React.FC<LoginScreenProp> = ({ navigation }) => {
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
      <Image
        source={require('@/assets/images/login_ils.png')} // Add your app logo here
        style={styles.logo}
      />
      <Card style={styles.card}>
        <Card.Title title="Welcome Back!" titleStyle={styles.title} />
        <Card.Content>
          <TextInput
            label="Email"
            mode="outlined"
            style={styles.input}
            theme={{ colors: { primary: '#6200ee' } }}
          />
          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            style={styles.input}
            theme={{ colors: { primary: '#6200ee' } }}
          />
          <Button
            mode="contained"
            style={styles.loginButton}
            labelStyle={styles.buttonText}
            onPress={() => navigation.replace('Home')}
          >
            Login
          </Button>
          <Text style={styles.orText}>OR</Text>
          <Button
            icon="google"
            mode="outlined"
            onPress={handleGoogleLogin}
            style={styles.socialButton}
            labelStyle={styles.socialButtonText}
          >
            Login with Google
          </Button>
          <Button
            icon="facebook"
            mode="outlined"
            onPress={handleFacebookLogin}
            style={styles.socialButton}
            labelStyle={styles.socialButtonText}
          >
            Login with Facebook
          </Button>
          <Button
            icon="microsoft"
            mode="outlined"
            onPress={handleMicrosoftLogin}
            style={styles.socialButton}
            labelStyle={styles.socialButtonText}
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
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: '#aaa',
  },
  socialButton: {
    marginBottom: 10,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 8,
  },
  socialButtonText: {
    fontSize: 14,
  },
});

export default LoginScreen;
