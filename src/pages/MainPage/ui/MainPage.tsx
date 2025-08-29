import { Navbar } from '@/widgets/Navbar';
import { FC, useContext } from 'react';
import { MoviesListContext } from '@/entities/movies-list/model/context';
import { ErrorPage } from '@/shared/ErrorPage';
import { MoviesList } from '@/widgets/MoviesList';

export const MainPage: FC = () => {
  const { error } = useContext(MoviesListContext);

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 h-[calc(100vh-120px)]">
        <div className="w-[200px]"></div>
        <div className="w-full h-full ">{error ? <ErrorPage /> : <MoviesList />}</div>
      </main>
      <footer className="w-full flex items-center justify-center py-3 h-12">MOVIE SEARCHER</footer>
    </div>
  );
};
