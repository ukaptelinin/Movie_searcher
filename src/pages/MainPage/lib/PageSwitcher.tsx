import { MoviesListLoader } from '@/features/MoviesListLoader';
import { RenderMoviesList } from '@/features/RenderMoviesList';
import { ErrorPage } from '@/shared/ErrorPage';
import { FC } from 'react';

export const PageSwitcher: FC<{ isPending: boolean; error: string | null }> = ({
  isPending,
  error,
}) => {
  if (isPending) {
    return <MoviesListLoader />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return <RenderMoviesList />;
};
