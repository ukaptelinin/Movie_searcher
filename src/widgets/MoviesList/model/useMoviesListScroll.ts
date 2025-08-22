import { MoviesResponse } from '@/shared/api/types';
import { RefObject, useEffect, useMemo, useRef } from 'react';

interface UseMoviesListParams {
  moviesList: MoviesResponse[];
  currentTitle: string;
  isPending: boolean;
  loadMoreMovies: () => Promise<void>;
}

interface UseMoviesListHookReturn {
  lastElementRef: RefObject<HTMLDivElement | null>;
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}

export const useMoviesListScroll = ({
  moviesList,
  currentTitle,
  isPending,
  loadMoreMovies,
}: UseMoviesListParams): UseMoviesListHookReturn => {
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const isPendingRef = useRef(isPending);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  isPendingRef.current = isPending;

  useEffect(() => {
    if (currentTitle && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentTitle]);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && moviesList.length > 0 && !isPendingRef.current) {
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

  return {
    lastElementRef,
    scrollContainerRef,
  };
};
