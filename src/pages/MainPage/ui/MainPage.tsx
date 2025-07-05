import { MoviesListContext } from '@/entities/movies-list/model/context';
import { Navbar } from '@/widgets/Navbar';
import { FC, useContext } from 'react';
import { PageSwitcher } from '../lib/PageSwitcher';

export const MainPage: FC = () => {
  const { error, isPending } = useContext(MoviesListContext);
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 h-[calc(100vh-120px)] overflow-y-auto">
        <div className="w-full h-full">
          <PageSwitcher isPending={isPending} error={error} />
        </div>
      </main>
      <footer className="w-full flex items-center justify-center py-3 h-12">MOVIE SEARCHER</footer>
    </div>
  );
};
