import { Button } from '@heroui/button';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const ReturnButton: FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      color="primary"
      variant="solid"
      onPress={() => navigate(-1)} // Навигация назад по истории React Router
    >
      Назад к списку
    </Button>
  );
};
