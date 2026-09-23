import { MoviesContextProvider } from '@/entities/movies-list/model/context';
import { HeroUIProvider } from '@heroui/system';
import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

export const App: FC = () => (
  <MoviesContextProvider>
    <HeroUIProvider>
      <RouterProvider router={router} />
    </HeroUIProvider>
  </MoviesContextProvider>
);
