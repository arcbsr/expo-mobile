import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const LoadingDes = () => {
  // Create animated values for scale and opacity
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Function to start animation
  const startAnimation = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Run the animation on component mount
  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}>
        <Icon name="download-outline" size={60} color="blue" />
      </Animated.View>
      <Animated.Text style={[styles.title, { opacity: opacityAnim }]}>
        Loading...
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: opacityAnim }]}>
        Please wait
      </Animated.Text>
      <View style={styles.iconContainer}>
        {/* <Text style={styles.filmIcon}>🎬</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    elevation: 5, // Shadow effect for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  filmIcon: {
    fontSize: 50,
  },
});

export default LoadingDes;
