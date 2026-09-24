import { Button } from '@heroui/button';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const ReturnButton: FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      className="w-7 h-7 bg-transparent"
      isIconOnly
      variant="light"
      onPress={() => navigate(-1)}
      aria-label="Вернуться назад"
    >
      <ArrowLeftIcon className="w-5 h-5 text-foreground" strokeWidth={2.5} />
    </Button>
  );
};
