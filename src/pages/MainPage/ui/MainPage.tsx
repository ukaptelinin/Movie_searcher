import { Navbar } from '@/widgets/Navbar';
import { FC } from 'react';

interface Props {
  children?: React.ReactNode;
}

export const MainPage: FC<Props> = ({ children }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto h-[calc(100vh-120px)] min-h-0 max-w-7xl px-6">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3 h-12">MOVIE SEARCHER</footer>
    </div>
  );
};
