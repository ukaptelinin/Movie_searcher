import { Link } from '@heroui/link';
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/navbar';
import { FilmIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import { ThemeSwitch } from '@/features/ThemeSwitch/ThemeSwitch';
import { SearchMoviesInput } from '@/features/SearchMoviesInput/SearchMoviesInput';

export const Navbar: FC = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="flex flex-row">
      <NavbarContent className="flex flex-1 justify-between">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <FilmIcon className="w-8 h-8 text-primary" />
            <p className="font-bold text-inherit pl-3">MOVIE SEARCHER</p>
          </Link>
        </NavbarBrand>
        <NavbarItem className="flex items-center gap-4 flex-grow">
          <SearchMoviesInput />
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};

export default Navbar;
