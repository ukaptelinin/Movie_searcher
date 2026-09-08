
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import { FC } from 'react';

export const ReturnButton: FC = () => (
  <Button showAnchorIcon as={Link} color="primary" href={'/movies'} variant="solid">
    Button Link
  </Button>
);
