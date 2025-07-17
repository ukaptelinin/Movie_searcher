import { MoviesListContext } from '@/entities/movies-list/model/context';
import { MoviesResponse } from '@/shared/api/types';
import { FC, useContext } from 'react';
import { MoviesCard } from './MoviesCard';

export const MoviesList: FC = () => {
  const { moviesList } = useContext(MoviesListContext);
  return (
    <div className="flex flex-wrap gap-4">
      {moviesList.map((item: MoviesResponse) => (
        <MoviesCard key={item.id} id={item.id} title={item.name} poster={item.poster.previewUrl} />
      ))}
    </div>
  );
};
