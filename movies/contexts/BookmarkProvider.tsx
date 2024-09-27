import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import MovieRepository, { Movie } from '../repositories/MovieRepository';

interface BookmarkContextType {
  movies: Movie[];
  loading: boolean;
  error: string | null; // Error state
  successMessage: string | null; // Success message state
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
  const [error, setError] = useState<string | null>(null); // Initialize error state
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // Initialize success message state

  useEffect(() => {
    fetchMovies(); // Fetch movies on component mount
  }, []);

  const fetchMovies = async (searchitem = "mov", page = 1) => {
    setLoading(true); // Set loading state to true
    setError(null); // Reset error state before fetching
    setSuccessMessage(null); // Reset success message state before fetching

    try {
      const fetchedMovies = await MovieRepository.getMovies(searchitem, page);
      const shuffledMovies = [...fetchedMovies].sort(() => Math.random() - 0.5);
      setMovies(shuffledMovies);
      setSuccessMessage("Movies fetched successfully!"); // Set success message on successful fetch
    } catch (err) {
      setError("Failed to fetch movies. Please try again."); // Set error message on failure
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const toggleBookmark = (imdbID: string) => {
    setBookmarks((prev) => {
      // Toggle bookmark for the given movie
      const isCurrentlyBookmarked = prev.includes(imdbID);
      if (isCurrentlyBookmarked) {
        setSuccessMessage(`Movie ${imdbID} has been removed from bookmarks.`); // Set success message
        return prev.filter(id => id !== imdbID); // Remove bookmark
      } else {
        setSuccessMessage(`Movie ${imdbID} has been added to bookmarks.`); // Set success message
        return [...prev, imdbID]; // Add bookmark
      }
    });
  };

  const isBookmarked = (imdbID: string) => bookmarks.includes(imdbID); // Check if the movie is bookmarked

  const getBookmarkedMovies = () => {
    return movies.filter(movie => isBookmarked(movie.imdbID)); // Return only bookmarked movies
  };

  return (
    <BookmarkContext.Provider value={{ 
      movies, 
      loading, 
      error, 
      successMessage, 
      toggleBookmark, 
      fetchMovies, 
      isBookmarked, 
      getBookmarkedMovies 
    }}>
      {children}
    </BookmarkContext.Provider>
  );
};

// Custom hook for accessing the BookmarkContext
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider'); // Error if hook is used outside provider
  }
  return context; // Return context if available
};
