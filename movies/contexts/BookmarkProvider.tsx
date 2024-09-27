import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import MovieRepository, { Movie, MovieDetail } from '../repositories/MovieRepository';

interface BookmarkContextType {
  movies: Movie[];
  loading: boolean;
  toggleBookmark: (imdbID: string) => void;
  fetchMovies: (searchitem: string, page: number) => Promise<void>;
  isBookmarked: (imdbID: string) => boolean;
  getBookmarkedMovies: () => Movie[];
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (searchitem="mov",page=1) => {
    const fetchedMovies = await MovieRepository.getMovies(searchitem,page);

    const shuffledMovies = [...fetchedMovies].sort(() => Math.random() - 0.5);
    setMovies(shuffledMovies);
    setLoading(false);
  };
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
    <BookmarkContext.Provider value={{ movies, loading, toggleBookmark,fetchMovies, isBookmarked, getBookmarkedMovies }}>
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
