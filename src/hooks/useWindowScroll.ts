import { useState } from 'react';
import useWindowEvent from './useWindowEvent';

interface Position {
  x: number;
  y: number;
}

type PartialPosition = Partial<Position>;

const getPosition = (): Position => {
  return typeof window !== 'undefined'
    ? { x: window.pageXOffset, y: window.pageYOffset }
    : { x: 0, y: 0 };
};

const scrollTo = ({ x, y }: PartialPosition) => {
  if (typeof window !== 'undefined') {
    const options: ScrollToOptions = { behavior: 'smooth' };
    if (x) {
      options.left = x;
    }
    if (y) {
      options.top = y;
    }
    window.scrollTo(options);
  }
};

export default function useWindowScroll(): [
  Position,
  (pos: PartialPosition) => void,
] {
  const [position, setPosition] = useState(getPosition());

  useWindowEvent('scroll', () => setPosition(getPosition()));
  useWindowEvent('resize', () => setPosition(getPosition()));

  return [position, scrollTo];
}
