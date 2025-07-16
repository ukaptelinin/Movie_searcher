import { FC } from 'react';
import { ReplacementCard } from './ReplacementCard';

export const MoviesListLoader: FC = () => {
  const loaderList = [];

  for (let i = 0; i < 20; i++) {
    loaderList.push(<ReplacementCard key={i} />);
  }
  return <div className="flex flex-wrap gap-4">{loaderList}</div>;
};
