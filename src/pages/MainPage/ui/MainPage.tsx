import { Navbar } from '@/widgets/Navbar';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const MainPage: FC = () => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto h-[calc(100vh-120px)] min-h-0 max-w-7xl px-6">
        <Outlet />
      </main>
      <footer className="w-full flex items-center justify-center py-3 h-12">MOVIE SEARCHER</footer>
    </div>
  );
};
