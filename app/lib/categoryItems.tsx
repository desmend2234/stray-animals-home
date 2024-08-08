import { ChefHat, Globe, PartyPopper } from 'lucide-react';
import { ReactNode } from 'react';

interface iAppProps {
  name: string;
  title: string;
  image: ReactNode;
  id: number;
}

export const categoryItems: iAppProps[] = [
  {
    id: 0,
    name: 'template',
    title: 'template',
    image: <Globe />,
  },
  {
    id: 1,
    name: 'uiKit',
    title: 'uiKit',
    image: <ChefHat />,
  },
  {
    id: 2,
    name: 'icon',
    title: 'icon',
    image: <PartyPopper />,
  },
];
