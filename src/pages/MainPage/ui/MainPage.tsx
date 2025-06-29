
import { MoviesListContext } from '@/entities/movies-list/model/context';
import { MoviesLoader } from '@/features/MoviesLoader';
import { RenderMoviesList } from '@/features/RenderMoviesList';
import { ErrorModal } from '@/shared/ErrorModal';
import { Navbar } from '@/widgets/Navbar';
import { FC, useContext } from 'react';

export const MainPage: FC = () => {
  const { isPending } = useContext(MoviesListContext);
  
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 h-[calc(100vh-120px)] overflow-y-auto">
        <div className="w-full h-full">
          <RenderMoviesList />
          {isPending && <MoviesLoader />}
        </div>
      </main>
      <footer className="w-full flex items-center justify-center py-3 h-12">
        MOVIE SEARCHER
      </footer>
      <ErrorModal/>
    </div>
    
  );
};
