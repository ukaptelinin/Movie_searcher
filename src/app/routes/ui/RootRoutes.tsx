import { StartPage } from '@/pages/MainPage';
import { MoviesItemPage } from '@/shared/MoviesItemPage';
import { MoviesListPage } from '@/shared/MoviesListPage';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

export const RootRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      {/* Маршрут для списка фильмов localhost:5173/movies */}
      <Route path="/movies" element={<MoviesListPage />} />

      {/* Маршрут для детальной страницы фильма localhost:5173/movies/123 */}
      <Route path="/movies/:id" element={<MoviesItemPage />} />
    </Routes>
  );
};
