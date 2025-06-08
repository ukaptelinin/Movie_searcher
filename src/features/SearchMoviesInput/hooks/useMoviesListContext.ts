import { MoviesListContext } from '@/entities/movies-list/model/MoviesListContext/context';
import { MoviesResponse } from '@/shared/api/types';
import { useContext } from 'react';

export const useMoviesListContext = (): ((
  movieTitle: string,
) => Promise<MoviesResponse[]>) => {
  const { getMovies } = useContext(MoviesListContext);
  return getMovies;
};
