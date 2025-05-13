import { FC } from 'react';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { SearchIcon } from '../../Assets/Icons/icons';

interface ITitleInput {
  inputText: string;
}

const SearchInput: FC = () => {
  const { control, handleSubmit, reset } = useForm<ITitleInput>({
    defaultValues: {
      inputText: '',
    },
  });

  const onSearcheMivie: SubmitHandler<ITitleInput> = (data) => {
    console.log(data.inputText);
    reset({
      inputText: '',
    });
  };
  return (
    <Form
      className="flex items-center gap-2 flex-grow"
      onSubmit={handleSubmit(onSearcheMivie)}
    >
      <Controller
        name="inputText"
        control={control}
        render={({ field }) => (
          <Input
            className="flex-grow"
            {...field}
            aria-label="Search"
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
        )}
      />
    </Form>
  );
};

export default SearchInput;
