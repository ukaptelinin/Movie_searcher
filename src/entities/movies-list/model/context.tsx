import { fetchMovies } from '@/shared/api';
import { MoviesResponse } from '@/shared/api/types';
import { createContext, FC, ReactNode, useRef, useState, useTransition } from 'react';
export interface IMoviesResponseContext {
  moviesList: MoviesResponse[];
  error: string | null;
  isPending: boolean;
  currentTitle: string;
  setMoviesTitle: (newTitle: string) => void;
  getFreshMovies: (movieTitle: string) => Promise<void>;
  loadMoreMovies: () => Promise<void>;
}

export const MoviesListContext = createContext<IMoviesResponseContext>({
  moviesList: [],
  error: null,
  isPending: false,
  currentTitle: '',
  setMoviesTitle: (): void => {},
  getFreshMovies: () => Promise.resolve(),
  loadMoreMovies: () => Promise.resolve(),
});

export const MoviesContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const pageNumber = useRef(1);
  const [moviesList, setMoviesList] = useState<MoviesResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [currentTitle, setcurrentTitle] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const setMoviesTitle = (newTitle: string): void => {
    setcurrentTitle(newTitle);
  };

  const getFreshMovies = async (movieTitle: string): Promise<void> => {
    await startTransition(async () => {
      try {
        setError(null);
        pageNumber.current = 1;
        setMoviesList([]);
        const { docs, pages } = await fetchMovies(movieTitle, pageNumber.current);

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
        if (pageNumber.current > totalPages) return;

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
        error,
        isPending,
        currentTitle,
        setMoviesTitle,
        getFreshMovies,
        loadMoreMovies,
      }}
    >
      {children}
    </MoviesListContext.Provider>
  );
};
