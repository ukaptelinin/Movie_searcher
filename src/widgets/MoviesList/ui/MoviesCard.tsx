import { FC, RefObject } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { Image } from '@heroui/image';

interface MoviesCardProps {
  id: number;
  title: string;
  poster: string;
  ref?: RefObject<HTMLDivElement | null> | null;
}

export const MoviesCard: FC<MoviesCardProps> = ({ id, title, poster, ref }) => (
  <Card className="flex flex-col h-[300px] w-[200px] flex-none" key={id} ref={ref}>
    <CardHeader className="py-2 px-4 w-[200px]">
      <h4 className="font-bold text-medium  overflow-hidden text-ellipsis whitespace-nowrap w-full">
        {title}
      </h4>
    </CardHeader>

    <CardBody className="overflow-visible pb-2 flex-1">
      {poster ? (
        <Image
          alt="Card background"
          className="object-cover rounded-xl w-full h-full"
          src={poster}
          width={200}
          height={240}
        />
      ) : (
        <div className="rounded-xl w-full h-full " />
      )}
    </CardBody>
  </Card>
);
