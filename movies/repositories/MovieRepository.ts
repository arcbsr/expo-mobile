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
  async getMovies(): Promise<Movie[]> {
    // Simulate fetching data from an API or local JSON
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(moviesData.Search);
      }, 1000); // Simulating network delay
    });
  }

  async getMovieDetail(): Promise<MovieDetail> {
    // Simulate fetching data from an API or local JSON
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(movieDetail);
      }, 1000); // Simulating network delay
    });
  }
}

export default new MovieRepository();
