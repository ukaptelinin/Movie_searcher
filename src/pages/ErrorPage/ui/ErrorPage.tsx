import { FC, useContext } from 'react';
import { MoviesListContext } from '@/entities/movies-list/model/context';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export const ErrorPage: FC = () => {
  const { error } = useContext(MoviesListContext);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-danger text-danger-foreground text-2xl font-bold p-4 rounded-lg">
      <ExclamationCircleIcon className="w-10 h-10" />
      <div className="mb-2">{error}</div>
    </div>
  );
};
