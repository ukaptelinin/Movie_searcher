import { MoviesListPage } from '@/pages/MoviesListPage';
import { MoviesItemPage } from '@/shared/MoviesItemPage';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

export const RootRoutes: FC = () => {
  const routes = {
    movies: '/movies',
    movieDetail: '/movies/:id',
  };

  return (
    <Routes>
      <Route path={routes.movies} element={<MoviesListPage />} />
      <Route path={routes.movieDetail} element={<MoviesItemPage />} />
    </Routes>
  );
};
