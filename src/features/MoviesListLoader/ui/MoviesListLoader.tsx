import { MoviesCard } from '@/features/RenderMoviesList';
import { FC } from 'react';

export const MoviesListLoader: FC = () => {
  const loaderList = [];

  for (let i = 0; i < 20; i++) {
    loaderList.push(<MoviesCard key={i} id={i} title={''} poster={'https://'} />);
  }
  return <div className="flex flex-wrap gap-4">{loaderList}</div>;
};
