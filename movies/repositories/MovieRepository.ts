import moviesData from '../assets/mlist.json';
import movieDetail from '../assets/mdetail.json';

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  BoxOffice: string;
  Website: string;
}

interface Rating {
  Source: string;
  Value: string;
}

class MovieRepository {
  private apiKey: string = '666da4ed'; // Replace with your OMDB API key

  async getMovies(searchTerm: string, page = 1): Promise<Movie[]> {
    // Set a default search term if the input is empty
    if (!searchTerm) {
      searchTerm = 'mov';
    }

    const apiUrl = `http://www.omdbapi.com/?apikey=${this.apiKey}&s=${encodeURIComponent(searchTerm)}&page=${page}`;
    console.log('API URL:', apiUrl); // Log the API URL for debugging

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Check if the API returned movies successfully
      if (data.Response === 'True') {
        return data.Search; // Returns an array of movies
      } else {
        // console.error('Error fetching movies:', data.Error); // Log the error response
        throw new Error(data.Error || 'Failed to fetch movies');
      }
    } catch (error) {
      // console.error('Error fetching movies:', error);
      throw new Error('An error occurred while fetching movies.'); // Throw an error for handling in the calling function
    }
  }

  async getMovieDetail(movieId: string): Promise<MovieDetail> {
    const apiUrl = `http://www.omdbapi.com/?i=${movieId}&apikey=${this.apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Check if the API returned the movie details successfully
      if (data.Response === 'True') {
        return data as MovieDetail; // Return movie details
      } else {
        console.error('Error fetching movie details:', data.Error); // Log the error response
        throw new Error(data.Error || 'Failed to fetch movie details');
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw new Error('An error occurred while fetching movie details.'); // Throw an error for handling in the calling function
    }
  }
}

export default new MovieRepository();
