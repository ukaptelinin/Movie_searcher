import { Navbar } from '@/widgets/Navbar';
import { FC, useContext } from 'react';
import { MoviesListContext } from '@/entities/movies-list/model/context';
import { MoviesListLoader } from '@/features/MoviesListLoader';
import { ErrorPage } from '@/shared/ErrorPage';
import { MoviesList } from '@/widgets/MoviesList';

export const MainPage: FC = () => {
  const { error, isPending } = useContext(MoviesListContext);

  const pageSwitcher = ((isPending: boolean, error: string | null) => {
    if (isPending) {
      return <MoviesListLoader />;
    }

    if (error) {
      return <ErrorPage />;
    }

    return <MoviesList />;
  })(isPending, error);

  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 h-[calc(100vh-120px)] overflow-y-auto">
        <div className="w-full h-full">{pageSwitcher}</div>
      </main>
      <footer className="w-full flex items-center justify-center py-3 h-12">MOVIE SEARCHER</footer>
    </div>
  );
};
