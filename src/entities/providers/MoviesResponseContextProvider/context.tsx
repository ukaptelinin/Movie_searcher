import { fetchMovies } from '@/shared/api/fetchMovies';
import { MoviesResponse } from '@/shared/api/types';
import { createContext, FC, ReactNode, useState, useTransition } from 'react';

interface IMoviesResponseContext {
  moviesList: MoviesResponse[];
  fetchError: string | null;
  moviesPageNumber: number;
  isPending: boolean;

  getMovies: (movieTitle: string) => Promise<MoviesResponse[]>;
}

export const MoviesResponseContext = createContext<IMoviesResponseContext>({
  moviesList: [],
  fetchError: null,
  moviesPageNumber: 1,
  isPending: false,
  getMovies: () => Promise.resolve([]),
});

const MoviesResponseContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [moviesList, setMoviesList] = useState<MoviesResponse[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [moviesPageNumber, setMoviesPageNumber] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  const setError = (error: string | null): void => {
    setFetchError(error);
  };

  const setLoadingPageNumber = (newPageNumber: number): void => {
    setMoviesPageNumber(newPageNumber);
  };

  const getMovies = async (movieTitle: string): Promise<MoviesResponse[]> => {
    try {
      startTransition(() => {
        setError(null);
      });

      const currentLoadingMovies = await fetchMovies(
        movieTitle,
        moviesPageNumber,
      );
      console.log(currentLoadingMovies);
      setMoviesList((prevMovies) => [...prevMovies, ...currentLoadingMovies]);
      console.log(moviesList);
      return currentLoadingMovies;
    } catch (error) {
      startTransition(() => {
        setError(
          error instanceof Error ? error.message : 'Неопознанная ошибка',
        );
      });
      return [];
    }
  };

  return (
    <MoviesResponseContext.Provider
      value={{
        moviesList,
        fetchError,
        moviesPageNumber,
        isPending,
        getMovies,
      }}
    >
      {children}
    </MoviesResponseContext.Provider>
  );
};

export default MoviesResponseContextProvider;
