import React from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import MovieItem from '../components/MovieItem';
import { useBookmarks } from '../contexts/BookmarkProvider'; // Adjust the import path
import NoBookmarks from '../components/EmptyView';
import { RootStackParamList } from '@/app/navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';


type BookmarkedMoviesScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};
const BookmarkedMoviesScreen: React.FC<BookmarkedMoviesScreenProps> = ({ navigation }) => {
  const { getBookmarkedMovies, loading, toggleBookmark } = useBookmarks();
  const bookmarkedMovies = getBookmarkedMovies();
  const handleMoviePress = (movieId: string) => {
    navigation.navigate('MovieDetail', { movieId: movieId });
  };
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {bookmarkedMovies.length === 0 ? (
        <NoBookmarks />
      ) : (
        <FlatList
          data={bookmarkedMovies}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              // Assuming you want to show bookmark status but might not need it for this screen
              isBookmarked={true}
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
});

export default BookmarkedMoviesScreen;
