import React from 'react';
import { ViewerHeader } from 'widgets/viewer';
import { ProfileGallery } from 'entitites/profile';
import { ViewerPostList } from 'widgets/viewer';

const ViewerPage: React.FC = () => {
  return (
    <>
      <ViewerHeader userId='3' />
      <br />
      <ProfileGallery />
      <br />
      <ViewerPostList />
    </>
  );
};

const data = Array.from({ length: 23 }).map((_, i) => ({
  id: String(i),
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently efficientlyefficiently efficiently efficientlye fficient lyefficientlyeffi ciently.',
  avatar: { url: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`, filename: 'sadsa' },
  likes: { count: 1, userIds: ['2'] },
  creator: { id: '1', username: `User N${i}` } as any,
  recipientId: 's23'
}));

export { ViewerPage };
