import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../app/navigation/types';
import { useMovieStore } from '../store/movieStore'; // Import Zustand store
import LoadingDes from '../components/LoadingDe';

type MovieDetailScreenProps = {
    route: RouteProp<RootStackParamList, 'MovieDetail'>;
};

const MovieDetailScreen: React.FC<MovieDetailScreenProps> = ({ route }) => {
    const { movieId } = route.params;
    const { movieData, isLoading, fetchMovieDetail, error } = useMovieStore();

    useEffect(() => {
        fetchMovieDetail(movieId);
    }, [movieId]);

    if (isLoading) {
        return <LoadingDes/>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (!movieData) {
        return <Text>No data available.</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: movieData.Poster }} style={styles.poster} />
            <Text style={styles.title}>{movieData.Title} ({movieData.Year})</Text>
            <Text style={styles.detail}>Rated: {movieData.Rated}</Text>
            <Text style={styles.detail}>Released: {movieData.Released}</Text>
            <Text style={styles.detail}>Runtime: {movieData.Runtime}</Text>
            <Text style={styles.detail}>Genre: {movieData.Genre}</Text>
            <Text style={styles.detail}>Director: {movieData.Director}</Text>
            <Text style={styles.detail}>Writer: {movieData.Writer}</Text>
            <Text style={styles.detail}>Actors: {movieData.Actors}</Text>
            <Text style={styles.plot}>{movieData.Plot}</Text>
            <Text style={styles.detail}>Ratings:</Text>
            {movieData.Ratings.map((rating, index) => (
                <Text key={index} style={styles.detail}>
                    {rating.Source}: {rating.Value}
                </Text>
            ))}
            <Text style={styles.detail}>Box Office: {movieData.BoxOffice}</Text>
            <Text style={styles.detail}>IMDb Rating: {movieData.imdbRating}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    poster: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    detail: {
        fontSize: 16,
        marginVertical: 4,
    },
    plot: {
        fontSize: 16,
        marginVertical: 10,
        fontStyle: 'italic',
    },
});

export default MovieDetailScreen;
