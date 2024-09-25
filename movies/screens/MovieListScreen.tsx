import React from 'react';
import { FlatList, TextInput, View, ActivityIndicator, StyleSheet } from 'react-native';
import MovieItem from '../components/MovieItem';
import { useBookmarks } from '../contexts/BookmarkProvider'; // Adjust the import path
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../app/navigation/types';


type MovieListScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const MovieListScreen: React.FC<MovieListScreenProps> = ({ navigation }) => {
  const { movies, loading, toggleBookmark, isBookmarked } = useBookmarks();
  const [searchTerm, setSearchTerm] = React.useState('');
  // const navigation = useNavigation();
  const filteredMovies = movies.filter(movie =>
    movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleMoviePress = (movieId: string) => {
    navigation.navigate('MovieDetail', { movieId: movieId });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search movies..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              isBookmarked={isBookmarked(item.imdbID)}
              onToggleBookmark={() => toggleBookmark(item.imdbID)}
              onPress={() => handleMoviePress(item.imdbID)}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
});

export default MovieListScreen;
