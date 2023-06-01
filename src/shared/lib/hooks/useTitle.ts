import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const useTitle = (title?: string) => {
  const [lsTitle, setLsTitle] = useLocalStorage<string>('pageTitle');
  React.useEffect(() => {
    if (title) {
      setLsTitle(title);
      document.title = title;
    }
  }, []);
  return lsTitle;
};

export { useTitle };
