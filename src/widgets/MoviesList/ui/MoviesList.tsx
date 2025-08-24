import { MoviesListContext } from '@/entities/movies-list/model/context';
import { MoviesResponse } from '@/shared/api/types';
import { FC, useContext } from 'react';
import { MoviesCard } from './MoviesCard';
import { MoviesListLoader } from '@/features/MoviesListLoader';
import { useMoviesListScroll } from '../model/useMoviesListScroll';

export const MoviesList: FC = () => {
  const { moviesList, currentTitle, loadMoreMovies, isPending } = useContext(MoviesListContext);
  const { lastElementRef, scrollContainerRef } = useMoviesListScroll({
    moviesList,
    currentTitle,
    isPending,
    loadMoreMovies,
  });
  return (
    <div
      ref={scrollContainerRef}
      className="flex flex-wrap gap-4 h-[calc(100vh-120px)] overflow-y-auto"    >
      {moviesList.map((item: MoviesResponse, index: number) => {
        const isLastItem = index === moviesList.length - 1;
        return (
          <MoviesCard
            key={item.id}
            id={item.id}
            title={item.name}
            poster={item.poster?.previewUrl ?? ''}
            ref={isLastItem ? lastElementRef : null}
          />
        );
      })}
      {isPending && <MoviesListLoader />}
    </div>
  );
};
