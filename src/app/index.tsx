import { MoviesContextProvider } from '@/entities/movies-list/model/MoviesListContext/context';
import MainPage from '@/pages/MainPage/MainPage';
import { HeroUIProvider } from '@heroui/system';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const App: FC = () => (
  <BrowserRouter>
    <MoviesContextProvider>
      <HeroUIProvider>
        <MainPage />
      </HeroUIProvider>
    </MoviesContextProvider>
  </BrowserRouter>
);
