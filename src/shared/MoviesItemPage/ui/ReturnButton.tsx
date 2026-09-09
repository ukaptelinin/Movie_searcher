import { Button } from '@heroui/button';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const ReturnButton: FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      isIconOnly
      color="primary"
      variant="solid"
      onPress={() => navigate(-1)}
      aria-label="Вернуться назад"
    >
      <ArrowLeftIcon className="w-5 h-5" />
    </Button>
  );
};
