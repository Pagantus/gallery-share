import React from 'react';
import { useTitle } from 'shared/lib/hooks/useTitle';
import { TITLES } from 'shared/constants/pages/titles';
import { ROUTES } from 'shared/constants/pages/routes';
import { ImageGallery } from 'widgets/image';

const GalleryPage: React.FC = () => {
  useTitle(TITLES[ROUTES.GALLERY]);
  return <ImageGallery />;
};

export { GalleryPage };
