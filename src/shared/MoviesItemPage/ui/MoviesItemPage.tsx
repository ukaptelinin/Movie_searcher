import { FC } from 'react';
import { useMoviesItemPage } from '../model/useMoviesItemPage';
import { ReturnButton } from './ReturnButton';
import { Image } from '@heroui/image';

export const MoviesItemPage: FC = () => {
  const moviesItem = useMoviesItemPage();
  const poster = moviesItem.poster?.previewUrl ?? '';
  return (
    <div
      className="box-border grid h-full min-h-0 w-full rounded-lg p-4 text-2xl font-bold"
      style={{
        gridTemplateRows: 'minmax(0, 1fr) minmax(0, 9fr)',
      }}
    >
      <div className="flex min-h-0 min-w-0 items-center">
        <ReturnButton />
      </div>

      <div
        className="grid min-h-0 min-w-0"
        style={{
          gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 7fr)',
        }}
      >
        <div className="min-h-0 min-w-0 overflow-auto">
          {poster ? (
            <Image
              alt="Card background"
              className="object-cover rounded-xl w-full h-full"
              src={poster}
              width={200}
              height={260}
            />
          ) : (
            <div
              className="rounded-xl w-full h-full"
              style={{
                maxWidth: '200px',
              }}
            />
          )}
        </div>

        <div className="min-h-0 min-w-0 overflow-auto px-2">
          <h1 className="mb-2 text-3xl font-bold text-center">{moviesItem.name}</h1>
          <div className="break-words text-1">{moviesItem.description}</div>
        </div>
      </div>
    </div>
  );
};
