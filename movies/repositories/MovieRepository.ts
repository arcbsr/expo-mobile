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
  // async getMovies(): Promise<Movie[]> {
  //   // Simulate fetching data from an API or local JSON
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(moviesData.Search);
  //     }, 1000); // Simulating network delay
  //   });
  // }
  async getMovies(searchTerm: string, page=1): Promise<Movie[]> {
    const apiKey = '666da4ed'; // Replace with your OMDB API key
    let apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&page=${page}`;

    if (searchTerm === '') {
      searchTerm = 'mov';
    }
    apiUrl += `&s=${encodeURIComponent(searchTerm)}`;
    console.log('API URL:', apiUrl);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      
      // Check if the API returned movies successfully
      if (data.Response === 'True') {
        return data.Search; // Returns an array of movies
      } else {
        throw new Error(data.Error || 'Failed to fetch movies');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      return []; // Return an empty array in case of error
    }
  }
  async getMovieDetail(_movieId: string): Promise<MovieDetail> {
    const apiKey = '666da4ed'; // Replace with your actual OMDb API key
    const apiUrl = `http://www.omdbapi.com/?i=${_movieId}&apikey=${apiKey}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.Response === 'True') {
        return data as MovieDetail;
      } else {
        throw new Error(data.Error || 'Failed to fetch movie details');
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error; // Rethrow the error to handle it at the calling function
    }
  }
}

export default new MovieRepository();
