import { FC, useContext } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { Image } from '@heroui/image';
import { Skeleton } from '@heroui/skeleton';
import { MoviesListContext } from '@/entities/movies-list/model/context';

export const MoviesCard: FC<{ id: number; title: string; poster: string }> = ({
  id,
  title,
  poster,
}) => {
  const { isPending } = useContext(MoviesListContext);
  return (
    <Card key={id} className="flex flex-col h-64 w-[200px] flex-none">
      <Skeleton className="rounded-lg" isLoaded={!isPending}>
        <CardHeader className="pb-0 pt-2 px-4 w-full" style={{ maxWidth: '200px' }}>
          <h4 className="font-bold text-medium overflow-hidden text-ellipsis whitespace-nowrap w-full">
            {title}
          </h4>
        </CardHeader>
      </Skeleton>
      <Skeleton className="rounded-lg" isLoaded={!isPending}>
        <CardBody className="overflow-visible py-2 flex-1">
          <Image
            alt="Card background"
            className="object-cover rounded-xl w-full h-full"
            src={poster}
            width={200}
            height={300}
          />
        </CardBody>
      </Skeleton>
    </Card>
  );
};
