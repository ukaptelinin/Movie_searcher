import { MoviesResponse } from '@/shared/api/types';
import { RefObject, useEffect, useMemo, useRef } from 'react';
import { NavigateFunction } from 'react-router-dom';

interface Props {
  moviesList: MoviesResponse[];
  currentTitle: string;
  isUrlChange: boolean;
  isPending: boolean;
  navigate: NavigateFunction;
  loadMoreMovies: () => Promise<void>;
  toggleIsUrlChange: () => void;
}

interface Result {
  lastElementRef: RefObject<HTMLDivElement | null>;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}

export const useMoviesListScroll = ({ moviesList, isPending, loadMoreMovies }: Props): Result => {
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isPendingRef = useRef(isPending);

  // Синхронизируем ref с актуальным состоянием загрузки
  useEffect(() => {
    isPendingRef.current = isPending;
  }, [isPending]);

  // Создаем IntersectionObserver для отслеживания последнего элемента
  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          // Если последний элемент виден, данных больше нет и не идет загрузка - подгружаем новые
          if (entry.isIntersecting && moviesList.length > 0 && !isPendingRef.current) {
            loadMoreMovies();
          }
        },
        { threshold: 0.1 }, // Срабатывает когда 10% элемента видно
      ),
    [moviesList.length, loadMoreMovies],
  );

  // Подключаем observer к последнему элементу
  useEffect(() => {
    const currentElement = lastElementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    // Отключаем observer при размонтировании
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [observer]);

  return {
    lastElementRef,
    scrollContainerRef,
  };
};
