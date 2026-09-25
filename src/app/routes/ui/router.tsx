import { MainPage } from '@/pages/MainPage';
import { MoviesListPage } from '@/pages/MoviesListPage';
import { MoviesItemPage } from '@/pages/MoviesItemPage';
import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from '@/pages/ErrorPage';

const BASE_URL = '/api/v1.4/movie/';
const API_KEY = import.meta.env.VITE_API_KEY;

export const routes = {
  movies: '/movies',
  movieDetail: '/movies/:id',
  errorPage: '/movies/error',
};
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />, // ← MainPage теперь содержит <Outlet />
    children: [
      {
        path: routes.movies,
        element: <MoviesListPage />,
      },
      {
        path: routes.errorPage,
        element: <ErrorPage />,
      },
      {
        path: routes.movieDetail,
        element: <MoviesItemPage />,
        loader: async ({ params }) => {
          const res = await fetch(`${BASE_URL}${params.id}`, {
            headers: {
              'X-API-KEY': API_KEY, // или process.env.API_KEY
              'Content-Type': 'application/json',
            },
          });
          if (!res.ok) throw new Response('Фильм не найден', { status: res.status });
          return res.json();
        },
      },
    ],
  },
]);
