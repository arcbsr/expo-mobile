import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface MovieItemProps {
  movie: Movie;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onPress: () => void;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie, isBookmarked, onToggleBookmark, onPress }) => {

  return (
    <TouchableOpacity onPress={onPress}  style={styles.container}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <View style={styles.details}>
        <Text style={styles.title}>{movie.Title}</Text>
        <Text style={styles.year}>{movie.Year}</Text>
      </View>
      <TouchableOpacity onPress={onToggleBookmark}>
        <Ionicons 
          name={isBookmarked ? "heart" : "heart-outline"} // Change icon based on bookmark state
          size={24}
          color={isBookmarked ? "orange" : "grey"} // Color change based on state
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    elevation: 1, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  poster: {
    width: 50,
    height: 75,
    borderRadius: 5,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  year: {
    color: '#666',
  },
});

export default MovieItem;
