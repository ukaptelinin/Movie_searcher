import { forwardRef } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { Image } from '@heroui/image';

interface MoviesCardProps {
  id: number;
  title: string;
  poster: string;
}

export const MoviesCard = forwardRef<HTMLDivElement, MoviesCardProps>(
  ({ id, title, poster }, ref) => (
    <Card className="flex flex-col h-64 w-[200px] flex-none" key={id} ref={ref}>
      <CardHeader className="pb-0 pt-2 px-4 w-full" style={{ maxWidth: '200px' }}>
        <h4 className="font-bold text-medium overflow-hidden text-ellipsis whitespace-nowrap w-full">
          {title}
        </h4>
      </CardHeader>

      <CardBody className="overflow-visible py-2 flex-1">
        <Image
          alt="Card background"
          className="object-cover rounded-xl w-full h-full"
          src={poster ? poster : '/'}
          width={200}
          height={300}
        />
      </CardBody>
    </Card>
  ),
);
