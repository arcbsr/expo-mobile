import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import MovieRepository, { Movie, MovieDetail } from '../repositories/MovieRepository';

interface BookmarkContextType {
  movies: Movie[];
  loading: boolean;
  toggleBookmark: (imdbID: string) => void;
  isBookmarked: (imdbID: string) => boolean;
  getBookmarkedMovies: () => Movie[];
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await MovieRepository.getMovies();

      const shuffledMovies = [...fetchedMovies].sort(() => Math.random() - 0.5);
      setMovies(shuffledMovies);
      setLoading(false);
    };

    fetchMovies();
  }, []);
  const toggleBookmark = (imdbID: string) => {
    setBookmarks((prev) => {
      if (prev.includes(imdbID)) {
        return prev.filter(id => id !== imdbID);
      } else {
        return [...prev, imdbID];
      }
    });
  };

  const isBookmarked = (imdbID: string) => bookmarks.includes(imdbID);

  const getBookmarkedMovies = () => {
    return movies.filter(movie => isBookmarked(movie.imdbID));
  };

  return (
    <BookmarkContext.Provider value={{ movies, loading, toggleBookmark, isBookmarked, getBookmarkedMovies }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
