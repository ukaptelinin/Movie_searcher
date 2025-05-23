import Navbar from '@/widgets/Navbar/ui/Navbar';
import { FC } from 'react';

const MainPage: FC = () => (
  <div className="relative flex flex-col h-screen">
    <Navbar />
    <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16 flex items-center justify-center">
      Main Page
    </main>
    <footer className="w-full flex items-center justify-center py-3">
      MOVIE SEARCHER
    </footer>
  </div>
);
export default MainPage;
