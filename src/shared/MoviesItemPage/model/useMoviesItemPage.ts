import { MoviesListContext } from '@/entities/movies-list/model/context';
import { MoviesResponse } from '@/shared/api/types';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

export const useMoviesItemPage = (): MoviesResponse => {
  const { moviesList } = useContext(MoviesListContext);
  const { id } = useParams();
  const currentMovies: MoviesResponse | undefined = moviesList.find(
    (item) => item.id === Number(id),
  );
  return currentMovies!;
};
