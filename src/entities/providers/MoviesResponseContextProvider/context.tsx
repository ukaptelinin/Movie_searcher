import { fetchMovies } from '@/shared/api/fetchMovies';
import { MoviesResponse } from '@/shared/api/types';
import { createContext, FC, ReactNode, useState, useTransition } from 'react';

interface IMoviesResponseContext {
  moviesList: MoviesResponse[];
  error: string | null;
  moviesPageNumber: number;
  isPending: boolean;

  getMovies: (movieTitle: string) => Promise<MoviesResponse[]>;
}

export const MoviesResponseContext = createContext<IMoviesResponseContext>({
  moviesList: [],
  error: null,
  moviesPageNumber: 1,
  isPending: false,
  getMovies: () => Promise.resolve([]),
});

const MoviesResponseContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [moviesList, setMoviesList] = useState<MoviesResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [moviesPageNumber, setMoviesPageNumber] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  const setCurrentError = (error: string | null): void => {
    setError(error);
  };

  const setLoadingPageNumber = (newPageNumber: number): void => {
    setMoviesPageNumber(newPageNumber);
  };

  const getMovies = async (movieTitle: string): Promise<MoviesResponse[]> => {
    let result: MoviesResponse[] = [];

    await startTransition(async () => {
      try {
        setCurrentError(null);
        setMoviesList([]);

        const currentLoadingMovies = await fetchMovies(
          movieTitle,
          moviesPageNumber,
        );

        result = currentLoadingMovies;
      } catch (error) {
        setCurrentError(
          error instanceof Error ? error.message : 'Неопознанная ошибка',
        );
        result = [];
      }
    });
    setMoviesList(moviesList.concat(result));
    return result;
  };

  return (
    <MoviesResponseContext.Provider
      value={{
        moviesList,
        error,
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
