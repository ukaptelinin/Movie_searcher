import { MoviesContextProvider } from '@/entities/movies-list/model/context';
import { MainPage } from '@/pages/MainPage';
import { HeroUIProvider } from '@heroui/system';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RootRoutes } from './routes/ui/RootRoutes';

export const App: FC = () => (
  <BrowserRouter>
    <MoviesContextProvider>
      <HeroUIProvider>
        <MainPage>
          <RootRoutes/>
        </MainPage>  
      </HeroUIProvider>
    </MoviesContextProvider>
  </BrowserRouter>
);
