import { MoviesListContext } from '@/entities/movies-list/model/context';
import { MoviesResponse } from '@/shared/api/types';
import { FC, useCallback, useContext, useLayoutEffect } from 'react';
import { MoviesCard } from './MoviesCard';
import { MoviesListLoader } from '@/features/MoviesListLoader';
import { useMoviesListScroll } from '../model/useMoviesListScroll';
import { useNavigate } from 'react-router-dom';

export const MoviesList: FC = () => {
  const {
    moviesList,
    currentTitle,
    isUrlChange,
    isPending,
    isNewInput,
    toggleIsNewInput,
    loadMoreMovies,
    toggleIsUrlChange,
  } = useContext(MoviesListContext);
  const navigate = useNavigate();

  const { lastElementRef, scrollContainerRef } = useMoviesListScroll({
    moviesList,
    currentTitle,
    isUrlChange,
    isPending,
    navigate,
    loadMoreMovies,
    toggleIsUrlChange,
  });

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const currentScroll = scrollContainerRef.current.scrollTop;
      if (currentScroll > 0) {
        sessionStorage.setItem('movies_scroll_pos', currentScroll.toString());
      }
    }
  }, [scrollContainerRef]);

  useLayoutEffect(() => {
    if (isNewInput) {
      sessionStorage.removeItem('movies_scroll_pos');

      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      toggleIsNewInput();
    }
  }, [isNewInput, toggleIsNewInput, scrollContainerRef]);

  useLayoutEffect(() => {
    if (isNewInput) return;

    const savedScrollPos = sessionStorage.getItem('movies_scroll_pos');

    if (savedScrollPos && moviesList.length > 0) {
      const scrollPos = Number(savedScrollPos);

      const timer = requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollPos;
        }
      });

      return () => cancelAnimationFrame(timer);
    }
  }, [moviesList.length, isNewInput, scrollContainerRef]);

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="flex flex-wrap gap-4 h-full overflow-y-auto"
    >
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
