import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.85}>
      <Image source={{ uri: movie.Poster }} style={styles.poster} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{movie.Title}</Text>
        <Text style={styles.year}>{movie.Year}</Text>
      </View>
      <TouchableOpacity onPress={onToggleBookmark} style={styles.bookmarkIcon}>
        <Ionicons
          name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color={isBookmarked ? '#ff6347' : '#b0b0b0'} // Use more appealing colors
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 1, // For Android shadow
  },
  poster: {
    width: 80,
    height: 90,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  year: {
    fontSize: 14,
    color: '#666',
  },
  bookmarkIcon: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    elevation: 10,
  },

});
export default MovieItem;
