import MainPage from '@/pages/MainPage/MainPage';
import { HeroUIProvider } from '@heroui/system';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MoviesResponseContextProvider from './providers/MoviesResponseContextProvider/context';

export const App: FC = () => (
  <BrowserRouter>
    <MoviesResponseContextProvider>
      <HeroUIProvider>
        <MainPage />
      </HeroUIProvider>
    </MoviesResponseContextProvider>
  </BrowserRouter>
);
