import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Animated, Alert, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../app/navigation/types';
import { useMovieStore } from '../store/movieStore'; 
import LoadingDes from '../components/LoadingDe';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useTheme } from '../../app/theme/ThemeContext'; // Import the custom hook

type MovieDetailScreenProps = {
    route: RouteProp<RootStackParamList, 'MovieDetail'>;
    navigation: any;
};

const MovieDetailScreen: React.FC<MovieDetailScreenProps> = ({ route, navigation }) => {
    const { movieId } = route.params;
    const { movieData, isLoading, fetchMovieDetail, error } = useMovieStore();
    const { colors, setDarkTheme } = useTheme(); // Access colors from theme context

    const scrollY = new Animated.Value(0);

    useEffect(() => {
        fetchMovieDetail(movieId);
        navigation.setOptions({
            headerStyle: {
                backgroundColor: colors.backgroundColor, // Set your header background color here
              },
              headerTintColor: colors.tint,
            headerRight: () => (
                <TouchableOpacity style={styles.iconContainer} onPress={handleDownload}>
                    <Icon name="download-outline" size={24} color={colors.icon} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, route]);

    const handleDownload = () => {
        Alert.alert('Download', 'Movie downloading...');
    };

    if (isLoading) {
        return <LoadingDes />;
    }

    if (error) {
        return <Text style={[styles.errorText, { color: colors.text }]}>{error}</Text>;
    }

    if (!movieData) {
        return <Text style={[styles.errorText, { color: colors.text }]}>No data available.</Text>;
    }

    const posterHeight = scrollY.interpolate({
        inputRange: [0, 300],
        outputRange: [400, 100],
        extrapolate: 'clamp',
    });

    return (
        <Animated.ScrollView
            style={[styles.container, { backgroundColor: colors.background }]}
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
            <Text style={[styles.title, { color: colors.text }]}>{movieData.Title} ({movieData.Year})</Text>
            <View style={[styles.infoBlock,{backgroundColor: colors.backgroundColor}]}>
                <Text style={[styles.detail, { color: colors.text }]}>Released: {movieData.Released}</Text>
                <Text style={[styles.detail, { color: colors.text }]}>Rated: {movieData.Rated}</Text>
                <Text style={[styles.detail, { color: colors.text }]}>Runtime: {movieData.Runtime}</Text>
                <Text style={[styles.detail, { color: colors.text }]}>Genre: {movieData.Genre}</Text>
            </View>
            <View style={[styles.infoBlock,{backgroundColor: colors.backgroundColor}]}>
                <Text style={[styles.heading, { color: colors.text }]}>Director</Text>
                <Text style={[styles.detail, { color: colors.text }]}>{movieData.Director}</Text>
            </View>
            <View style={[styles.infoBlock,{backgroundColor: colors.backgroundColor}]}>
                <Text style={[styles.heading, { color: colors.text }]}>Writer</Text>
                <Text style={[styles.detail, { color: colors.text }]}>{movieData.Writer}</Text>
            </View>
            <View style={[styles.infoBlock,{backgroundColor: colors.backgroundColor}]}>
                <Text style={[styles.heading, { color: colors.text }]}>Actors</Text>
                <Text style={[styles.detail, { color: colors.text }]}>{movieData.Actors}</Text>
            </View>
            <Text style={[styles.plot, { color: colors.text }]}>{movieData.Plot}</Text>

            <View style={[styles.infoBlock,{backgroundColor: colors.backgroundColor}]}>
                <Text style={[styles.heading, { color: colors.text }]}>Box Office</Text>
                <Text style={[styles.detail, { color: colors.text }]}>{movieData.BoxOffice}</Text>
            </View>

            <View style={[styles.infoBlock,{backgroundColor: colors.backgroundColor}]}>
                <Text style={[styles.imdbRating, { color: colors.text }]}>IMDb Rating: {movieData.imdbRating}</Text>
                {movieData.Ratings.map((rating, index) => (
                    <Text key={index} style={[styles.rating, { color: colors.text }]}>
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
        padding: 10,
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
        textAlign: 'center',
        marginVertical: 10,
    },
    infoBlock: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
    },
    detail: {
        fontSize: 16,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    plot: {
        fontSize: 16,
        color: '#444444',
        marginVertical: 15,
        fontStyle: 'italic',
        lineHeight: 24,
    },
    ratingBlock: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
    },
    imdbRating: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    rating: {
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    iconContainer: {
        paddingRight: 15,
    },
});

export default MovieDetailScreen;
