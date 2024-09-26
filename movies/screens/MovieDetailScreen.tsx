import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Animated, Alert, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../app/navigation/types';
import { useMovieStore } from '../store/movieStore'; // Import Zustand store
import LoadingDes from '../components/LoadingDe';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons from react-native-vector-icons

type MovieDetailScreenProps = {
    route: RouteProp<RootStackParamList, 'MovieDetail'>;
    navigation: any; // Add navigation prop for accessing header customization
};

const MovieDetailScreen: React.FC<MovieDetailScreenProps> = ({ route, navigation }) => {
    const { movieId } = route.params;
    const { movieData, isLoading, fetchMovieDetail, error } = useMovieStore();

    const scrollY = new Animated.Value(0);

    useEffect(() => {
        fetchMovieDetail(movieId);

        // Customize the header with icons
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.iconContainer} onPress={handleDownload}>
                    <Icon name="download-outline" size={24} color="#000000" />
                </TouchableOpacity>
            ),
            // headerLeft: () => (
            //     <TouchableOpacity style={styles.iconContainer} onPress={handleSave}>
            //         <Icon name="bookmark-outline" size={24} color="#000000" />
            //     </TouchableOpacity>
            // ),
        });
    }, [movieId, navigation]);

    // Action handlers for the icons
    const handleDownload = () => {
        Alert.alert('Download', 'Movie downloading...');
    };

    const handleSave = () => {
        Alert.alert('Save', 'Movie saved to your favorites.');
    };

    if (isLoading) {
        return <LoadingDes />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    if (!movieData) {
        return <Text style={styles.errorText}>No data available.</Text>;
    }

    const posterHeight = scrollY.interpolate({
        inputRange: [0, 300],
        outputRange: [400, 100],
        extrapolate: 'clamp',
    });

    return (
        <Animated.ScrollView
            style={styles.container}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
        >
            <Animated.Image
                source={{ uri: movieData.Poster }}
                style={[styles.poster, { height: posterHeight }]}
            />
            <Text style={styles.title}>{movieData.Title} ({movieData.Year})</Text>
            <View style={styles.infoBlock}>
                <Text style={styles.detail}>Released: {movieData.Released}</Text>
                <Text style={styles.detail}>Rated: {movieData.Rated}</Text>
                <Text style={styles.detail}>Runtime: {movieData.Runtime}</Text>
                <Text style={styles.detail}>Genre: {movieData.Genre}</Text>
            </View>
            <View style={styles.infoBlock}>
                <Text style={styles.heading}>Director</Text>
                <Text style={styles.detail}>{movieData.Director}</Text>
            </View>
            <View style={styles.infoBlock}>
                <Text style={styles.heading}>Writer</Text>
                <Text style={styles.detail}>{movieData.Writer}</Text>
            </View>
            <View style={styles.infoBlock}>
                <Text style={styles.heading}>Actors</Text>
                <Text style={styles.detail}>{movieData.Actors}</Text>
            </View>
            <Text style={styles.plot}>{movieData.Plot}</Text>

            <View style={styles.infoBlock}>
                <Text style={styles.heading}>Box Office</Text>
                <Text style={styles.detail}>{movieData.BoxOffice}</Text>
            </View>

            <View style={styles.ratingBlock}>
                <Text style={styles.imdbRating}>IMDb Rating: {movieData.imdbRating}</Text>
                {movieData.Ratings.map((rating, index) => (
                    <Text key={index} style={styles.rating}>
                        {rating.Source}: {rating.Value}
                    </Text>
                ))}
            </View>
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1e',
    },
    poster: {
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#ffffff',
        textAlign: 'center',
        marginVertical: 10,
    },
    infoBlock: {
        backgroundColor: '#2a2a2d',
        padding: 12,
        borderRadius: 10,
        marginVertical: 8,
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        color: '#f4f4f5',
        marginBottom: 4,
    },
    detail: {
        fontSize: 16,
        color: '#e0e0e2',
        marginVertical: 2,
    },
    plot: {
        fontSize: 16,
        color: '#d1d1d3',
        marginVertical: 15,
        fontStyle: 'italic',
        lineHeight: 24,
    },
    ratingBlock: {
        backgroundColor: '#2a2a2d',
        padding: 12,
        borderRadius: 10,
        marginVertical: 8,
    },
    imdbRating: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f5c518',
        marginBottom: 10,
    },
    rating: {
        fontSize: 16,
        color: '#f4f4f5',
        marginBottom: 4,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    iconContainer: {
        paddingHorizontal: 10,
    },
});

export default MovieDetailScreen;
