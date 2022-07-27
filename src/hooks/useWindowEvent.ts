import { useEffect } from 'react';

export default function useWindowEvent<T extends keyof WindowEventMap>(
  type: T,
  listener: (this: Window, ev: WindowEventMap[T]) => void,
  options?: EventListenerOptions,
) {
  useEffect(() => {
    window.addEventListener(type, listener, options);
    return () => window.removeEventListener(type, listener, options);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
