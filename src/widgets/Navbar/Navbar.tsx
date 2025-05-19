import { Link } from '@heroui/link';
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/navbar';
import { Avatar } from '@heroui/avatar';
import { FC } from 'react';
import { ThemeSwitch } from '@/features/ThemeSwitch/ThemeSwitch';
import SearchInput from '@/features/SearchInput/SearchInput';

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
            <Avatar size="md" src="../public/img/cinema.png" />
            <p className="font-bold text-inherit pl-3">MOVIE SEARCHER</p>
          </Link>
        </NavbarBrand>
        <NavbarItem className="flex items-center gap-4 flex-grow">
          <SearchInput />
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};

export default Navbar;
