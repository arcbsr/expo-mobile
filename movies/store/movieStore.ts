import { create } from 'zustand';
import MovieRepository, { MovieDetail } from '../repositories/MovieRepository';

type MovieStore = {
  movieData: MovieDetail | null;
  isLoading: boolean;
  error: string | null;
  fetchMovieDetail: (movieId: string) => Promise<void>;
};

export const useMovieStore = create<MovieStore>((set) => ({
  movieData: null,
  isLoading: false,
  error: null,

  fetchMovieDetail: async (movieId: string) => {
    set({ isLoading: true, error: null });

    try {
      const movieData = await MovieRepository.getMovieDetail();
      set({ movieData, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch movie details', isLoading: false });
    }
  },
}));
