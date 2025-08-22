import { fetchMovies } from '@/shared/api';
import { MoviesResponse } from '@/shared/api/types';
import { createContext, FC, ReactNode, useRef, useState, useTransition } from 'react';
export interface IMoviesResponseContext {
  moviesList: MoviesResponse[];
  currentTitle: string;
  error: string | null;
  isPending: boolean;
  getFreshMovies: (movieTitle: string) => Promise<void>;
  loadMoreMovies: () => Promise<void>;
}

export const MoviesListContext = createContext<IMoviesResponseContext>({
  moviesList: [],
  currentTitle: '',
  error: null,
  isPending: false,
  getFreshMovies: () => Promise.resolve(),
  loadMoreMovies: () => Promise.resolve(),
});

export const MoviesContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const pageNumber = useRef(1);
  const [currentTitle, setCurrentTitle] = useState('');
  const [moviesList, setMoviesList] = useState<MoviesResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [totalPages, setTotalPages] = useState(0);

  const getFreshMovies = async (movieTitle: string): Promise<void> => {
    await startTransition(async () => {
      try {
        setError(null);
        if (movieTitle === '') return;
        setCurrentTitle(movieTitle);
        pageNumber.current = 1;
        setMoviesList([]);
        console.log(moviesList.length);
        const { docs, pages } = await fetchMovies(movieTitle, 1);

        setTotalPages(pages);
        setMoviesList(docs);
      } catch (error) {
        setError(
          error instanceof Error && error.message === 'Фильмы не найдены'
            ? error.message
            : 'Что-то пошло не так',
        );
      }
    });
  };

  const loadMoreMovies = async (): Promise<void> => {
    await startTransition(async () => {
      try {
        setError(null);
        console.log('NEXT 2');
        // if (pageNumber.current > totalPages || !currentTitle) return;
        console.log('NEXT 3');

        pageNumber.current = pageNumber.current + 1;
        const { docs } = await fetchMovies(currentTitle, pageNumber.current);

        setMoviesList((prevMovies) => [...prevMovies, ...docs]);
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
        currentTitle,
        error,
        isPending,
        getFreshMovies,
        loadMoreMovies,
      }}
    >
      {children}
    </MoviesListContext.Provider>
  );
};
