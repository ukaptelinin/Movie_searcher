import { FC } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useMoviesListContext } from '@/entities/movies-list';
import { useNavigate } from 'react-router-dom';

const SEARCH_STORAGE_KEY = 'movies_search_query';

export const SearchMoviesInput: FC = () => {
  const { getFreshMovies } = useMoviesListContext();
  const navigate = useNavigate();
   const savedSearch = sessionStorage.getItem(SEARCH_STORAGE_KEY);
  const onSearcheMovie = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('search') as string;

    if (title && title.trim() !== '') {
      sessionStorage.setItem(SEARCH_STORAGE_KEY, title);
    }

    await getFreshMovies(title);
    navigate(`/movies`);
  };

  return (
    <Form className="flex items-center gap-2 flex-grow" onSubmit={onSearcheMovie}>
      <Input
        className="flex-grow"
        name="search"
        defaultValue={savedSearch && savedSearch.trim() !== '' ? savedSearch : undefined}
        labelPlacement="outside"
        placeholder="Фильмы, сериалы"
        endContent={
          <Button
            type="submit"
            isIconOnly
            variant="light"
            aria-label="Search"
            className="text-default-400 hover:bg-default-100"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-default-400 pointer-events-none flex-shrink-0" />
          </Button>
        }
        type="search"
      />
    </Form>
  );
};
