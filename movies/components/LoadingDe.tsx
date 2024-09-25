import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoadingDes = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="access-point-network" size={100} color="#808080" />
      <Text style={styles.title}>Loading...</Text>
      <Text style={styles.subtitle}>Please wait</Text>
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
