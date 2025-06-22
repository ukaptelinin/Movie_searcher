import { fetchMovies } from '@/shared/api';
import { MoviesResponse } from '@/shared/api/types';
import { createContext, FC, ReactNode, useState, useTransition } from 'react';
export interface IMoviesResponseContext {
  moviesList: MoviesResponse[];
  error: string | null;
  moviesPageNumber: number;
  isPending: boolean;
  getMovies: (movieTitle: string) => Promise<MoviesResponse[]>;
}

export const MoviesListContext = createContext<IMoviesResponseContext>({
  moviesList: [],
  error: null,
  moviesPageNumber: 1,
  isPending: false,
  getMovies: () => Promise.resolve([]),
});

export const MoviesContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [moviesList, setMoviesList] = useState<MoviesResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [moviesPageNumber, setMoviesPageNumber] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  const getMovies = async (movieTitle: string): Promise<MoviesResponse[]> => {
    return new Promise<MoviesResponse[]>((resolve) => {
      startTransition(() => {
      
        setError(null);
        setMoviesList([]);

        fetchMovies(movieTitle, moviesPageNumber)
          .then((result) => {
        
            setMoviesList(result);
          
            resolve(result);
          })
          .catch((error) => {
            setError(error.message);
          
            resolve([]);
          });
      });
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
