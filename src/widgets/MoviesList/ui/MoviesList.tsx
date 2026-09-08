import { MoviesListContext } from '@/entities/movies-list/model/context';
import { MoviesResponse } from '@/shared/api/types';
import { FC, useCallback, useContext, useLayoutEffect } from 'react';
import { MoviesCard } from './MoviesCard';
import { MoviesListLoader } from '@/features/MoviesListLoader';
import { useMoviesListScroll } from '../model/useMoviesListScroll';
import { useNavigate } from 'react-router-dom';

export const MoviesList: FC = () => {
  const { moviesList, currentTitle, isUrlChange, isPending, loadMoreMovies, toggleIsUrlChange } =
    useContext(MoviesListContext);
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

  // 1. Сохраняем актуальный скролл при прокрутке
  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const currentScroll = scrollContainerRef.current.scrollTop;
      // Записываем только если скролл больше 0, чтобы случайный сброс не перезаписал позицию
      if (currentScroll > 0) {
        sessionStorage.setItem('movies_scroll_pos', currentScroll.toString());
      }
    }
  }, [scrollContainerRef]);

  // 2. Восстанавливаем скролл после того, как DOM полностью отрисован браузером
  useLayoutEffect(() => {
    const savedScrollPos = sessionStorage.getItem('movies_scroll_pos');

    if (savedScrollPos && moviesList.length > 0) {
      const scrollPos = Number(savedScrollPos);

      // Используем requestAnimationFrame, чтобы дождаться окончания Layout-фазы браузера
      const timer = requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollPos;
        }
      });

      return () => cancelAnimationFrame(timer);
    }
  }, [moviesList.length]); // Срабатывает, когда данные загружены/восстановлены в state

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
