import { FC } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { SearchIcon } from '../../shared/ui/Icons/icons';

const SearchInput: FC = () => {
  const onSearcheMivie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const inputText = formData.get('search') as string;
    e.currentTarget.reset();
  };

  return (
    <Form
      className="flex items-center gap-2 flex-grow"
      onSubmit={onSearcheMivie}
    >
      <Input
        className="flex-grow"
        name="search"
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
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          </Button>
        }
        type="search"
      />
    </Form>
  );
};

export default SearchInput;
