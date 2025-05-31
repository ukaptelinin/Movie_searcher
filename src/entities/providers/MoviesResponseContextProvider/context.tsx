import { fetchMovies } from '@/shared/api/fetchMovies';
import { MoviesResponse } from '@/shared/models/types';
import { createContext, FC, ReactNode, useState } from 'react';

interface IMoviesResponseContext {
  moviesList: MoviesResponse[];
  fetchError: string | null;
  isLoadingMovies: boolean;
  moviesPageNumber: number;
  addMovies: (newMovies: MoviesResponse[]) => void;
  setError: (error: string | null) => void;
  toggleLoadingMovies: () => void;
  setLoadingPageNumber: (newPageNumber: number) => void;
  getMovies: (movieTitle: string) => Promise<MoviesResponse[]>;
}

export const MoviesResponseContext = createContext<IMoviesResponseContext>({
  moviesList: [],
  fetchError: null,
  isLoadingMovies: false,
  moviesPageNumber: 1,
  addMovies: () => {},
  setError: () => {},
  toggleLoadingMovies: () => {},
  setLoadingPageNumber: () => {},
  getMovies: () => Promise.resolve([]),
});

const MoviesResponseContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [moviesList, setMoviesList] = useState<MoviesResponse[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoadingMovies, setIsLoadingMovies] = useState<boolean>(false);
  const [moviesPageNumber, setMoviesPageNumber] = useState<number>(1);

  const addMovies = (newMovies: MoviesResponse[]): void => {
    setMoviesList((currentMovies) => [...currentMovies, ...newMovies]);
  };

  const setError = (error: string | null): void => {
    setFetchError(error);
  };

  const toggleLoadingMovies = (): void => {
    setIsLoadingMovies(!isLoadingMovies);
  };

  const setLoadingPageNumber = (newPageNumber: number): void => {
    setMoviesPageNumber(newPageNumber);
  };

  const getMovies = async (movieTitle: string): Promise<MoviesResponse[]> => {
    try {
      toggleLoadingMovies();
      setError(null);
      const currentLoadingMovies = await fetchMovies(
        movieTitle,
        moviesPageNumber,
      );
      return currentLoadingMovies;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Не опознанная ошибка');
      return [];
    } finally {
      toggleLoadingMovies();
    }
  };

  return (
    <MoviesResponseContext.Provider
      value={{
        moviesList,
        fetchError,
        isLoadingMovies,
        moviesPageNumber,
        addMovies,
        setError,
        toggleLoadingMovies,
        setLoadingPageNumber,
        getMovies,
      }}
    >
      {children}
    </MoviesResponseContext.Provider>
  );
};

export default MoviesResponseContextProvider;
