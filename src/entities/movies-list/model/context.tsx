import { fetchMovies } from '@/shared/api';
import { MoviesResponse } from '@/shared/api/types';
import { createContext, FC, ReactNode, useState, useTransition } from 'react';
export interface IMoviesResponseContext {
  moviesList: MoviesResponse[];
  error: string | null;
  moviesPageNumber: number;
  isPending: boolean;
  getMovies: (movieTitle: string) => Promise<void>;
}

export const MoviesListContext = createContext<IMoviesResponseContext>({
  moviesList: [],
  error: null,
  moviesPageNumber: 1,
  isPending: false,
  getMovies: () => Promise.resolve(),
});

export const MoviesContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [moviesList, setMoviesList] = useState<MoviesResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [moviesPageNumber, setMoviesPageNumber] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  const getMovies = async (movieTitle: string): Promise<void> => {
    await startTransition(async () => {
      try {
        setError(null);
        const currentLoadingMovies = await fetchMovies(movieTitle, moviesPageNumber);
        setMoviesList(currentLoadingMovies);
      } catch (error) {
        setError(
          error instanceof Error && error.message === 'Фильмы не найдены'
            ? error.message
            : 'Что-то пошло не так',
        );
      }
    });
  };

  return (
    <MoviesListContext.Provider
      value={{
        moviesList,
        error,
        moviesPageNumber,
        isPending,
        getMovies,
      }}
    >
      {children}
    </MoviesListContext.Provider>
  );
};
