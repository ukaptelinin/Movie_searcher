import { FC } from 'react';
import { useMoviesItemPage } from '../model/useMoviesItemPage';
import { ReturnButton } from './ReturnButton';

export const MoviesItemPage: FC = () => {
  const moviesItem = useMoviesItemPage();
  console.log(moviesItem.name);
  return (
    // Родительский компонент
    <div
      className="box-border grid h-full min-h-0 w-full rounded-lg border-2 border-red-500 p-4 text-2xl font-bold"
      style={{
        gridTemplateRows: 'minmax(0, 1fr) minmax(0, 9fr)',
      }}
    >
      {/* Верхний блок — 10% */}
      <div className="flex min-h-0 min-w-0 items-center border-2 border-blue-500">
        <ReturnButton />
      </div>

      {/* Нижний блок — 90% */}
      <div
        className="grid min-h-0 min-w-0 border-2 border-green-500"
        style={{
          gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 7fr)',
        }}
      >
        {/* Левая колонка — 30% */}
        <div className="min-h-0 min-w-0 overflow-auto border-2 border-yellow-500">
          {/* Содержимое левой колонки */}
        </div>

        {/* Правая колонка — 70% */}
        <div className="min-h-0 min-w-0 overflow-auto border-2 border-purple-500">
          <div className="mb-2">Фильм</div>
          <div className="break-words">{moviesItem.name}</div>
        </div>
      </div>
    </div>
  );
};
