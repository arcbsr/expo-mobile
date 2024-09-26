import React, { useEffect, useCallback } from 'react';
import { FlatList, TextInput, View, ActivityIndicator, StyleSheet, TouchableOpacity, BackHandler, Alert } from 'react-native';
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
  
  const handleLogout = () => {
    // Handle logout logic and navigate to the LoginScreen
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
          style: "cancel"
        },
        {
          text: "Exit",
          onPress: () => BackHandler.exitApp()
        }
      ],
      { cancelable: false }
    );
    return true; // Prevent default back behavior
  };

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      // Clean up the event listener when the screen loses focus
      return () => backHandler.remove();
    }, [])
  );
  useEffect(() => {
    // Customize the header with the logout icon
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.iconContainer} onPress={handleLogout}>
          <Icon name="log-out-outline" size={24} color="red" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const { movies, loading, toggleBookmark, isBookmarked } = useBookmarks();
  const [searchTerm, setSearchTerm] = React.useState('');

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
// const { width } = Dimensions.get('window');
// import { Platform } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 5,
    marginBottom: 16,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
});

export default MovieListScreen;
