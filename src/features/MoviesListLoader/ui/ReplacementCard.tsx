import { Card, CardBody, CardHeader } from '@heroui/card';
import { Skeleton } from '@heroui/skeleton';
import { FC } from 'react';

export const ReplacementCard: FC = () => (
  <Card className="flex flex-col h-[300px] w-[200px] flex-none">
    <Skeleton className="rounded-lg">
      <CardHeader className="py-2 px-4 w-full h-6" />
    </Skeleton>
    <Skeleton className="rounded-lg">
      <CardBody className="overflow-visible py-2 flex-1 ">
        <Skeleton
          className="rounded-xl w-full h-full"
          style={
            {
              minHeight: '300px',
              minWidth: '200px',
            } /*Применены инлайн стили, так как стили заданные в TailwindCSS совместно с HeroUI работают не корректно*/
          }
        />
      </CardBody>
    </Skeleton>
  </Card>
);
