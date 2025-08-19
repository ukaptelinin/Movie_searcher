import { MoviesListContext } from '@/entities/movies-list/model/context';
import { MoviesResponse } from '@/shared/api/types';
import { FC, useContext, useEffect, useMemo, useRef } from 'react';
import { MoviesCard } from './MoviesCard';
import { MoviesListLoader } from '@/features/MoviesListLoader';

export const MoviesList: FC = () => {
  const { moviesList, loadMoreMovies, isPending } = useContext(MoviesListContext);
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const isPendingRef = useRef(isPending);
  isPendingRef.current = isPending;

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && moviesList.length > 0) {
            loadMoreMovies();
          }
        },
        { threshold: 0.1 },
      ),
    [moviesList.length],
  );

  useEffect(() => {
    if (lastElementRef.current) {
      observer?.observe(lastElementRef.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, [observer]);

  return (
    <div className="flex flex-wrap gap-4 h-[calc(100vh-120px)] overflow-y-auto">
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
