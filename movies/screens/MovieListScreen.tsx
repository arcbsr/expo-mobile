import React, { useEffect, useCallback, useState } from 'react';
import { FlatList, TextInput, View, ActivityIndicator, StyleSheet, TouchableOpacity, BackHandler, Alert, Keyboard, Text } from 'react-native';
import MovieItem from '../components/MovieItem';
import { useBookmarks } from '../contexts/BookmarkProvider'; // Adjust the import path
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../app/navigation/types';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type MovieListScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const MovieListScreen: React.FC<MovieListScreenProps> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchText, setsearchText] = useState('');
  const [page, setPage] = useState(1);
  const { movies, loading, toggleBookmark, fetchMovies, isBookmarked, error, successMessage } = useBookmarks();

  const handleLogout = () => {
    navigation.replace('LoginScreen');
  };

  const handleBackPress = () => {
    Alert.alert(
      "Exit App",
      "Are you sure you want to exit?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Exit",
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: false }
    );
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => backHandler.remove();
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.iconContainer} onPress={handleLogout}>
          <Icon name="log-out-outline" size={24} color="red" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchMovies(searchTerm, page); // Fetch movies whenever the search term or page changes
  }, [searchTerm, page]);

  const handleMoviePress = (movieId: string) => {
    navigation.navigate('MovieDetail', { movieId });
  };

  const handleSearchSubmit = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
    setPage(1); // Reset to page 1 when a new search is performed
    setSearchTerm(searchText);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1); 
    }
  };

  // if (error) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text style={styles.errorText}>{error}</Text>
  //     </View>
  //   );
  // }
  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={setsearchText} // Set searchTerm but don't trigger search on key type
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handleSearchSubmit} style={styles.searchButton}>
          <Icon name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Success Message */}
      {successMessage && (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      )}

      {/* Movie List */}
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <FlatList
            data={movies}
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

          {/* Pagination Controls */}
          <View style={styles.paginationContainer}>
            <TouchableOpacity onPress={handlePreviousPage} disabled={page === 1} style={styles.paginationButton}>
              <Icon name="arrow-back" size={24} color={page === 1 ? '#ccc' : '#000'} />
            </TouchableOpacity>
            <Text style={styles.pageText}>Page {page}</Text>
            <TouchableOpacity onPress={handleNextPage} style={styles.paginationButton}>
              <Icon name="arrow-forward" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    paddingLeft: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  errorText: {
    color: '#721c24',
    fontWeight: 'bold',
  },
  successContainer: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  successText: {
    color: '#155724',
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 20,
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  paginationButton: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#fff',
    elevation: 5,
  },
  pageText: {
    fontSize: 16,
    marginHorizontal: 20,
    fontWeight: 'bold',
    color: '#007bff',
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
});

export default MovieListScreen;
