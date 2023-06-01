import { ProfileGallery } from 'entitites/profile';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import { UserHeader } from 'widgets/user';
import { UserPostList } from 'widgets/user';

const UserPage: React.FC = () => {
  return (
    <>
      <UserHeader userId='3' />
      <br />
      <ProfileGallery />
      <br />
      <UserPostList
        posts={data}
        viewerId='2'
      />
    </>
  );
};

const data = Array.from({ length: 23 }).map((_, i) => ({
  id: String(i),
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently efficientlyefficiently efficiently efficientlye fficient lyefficientlyeffi ciently.',
  avatar: { url: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`, filename: 'sadsa' },
  username: `User N${i}`,
  likes: { count: 1, userIds: ['2'] },
  creator: {} as any,
  recipientId: 's23',
  createdAt: Timestamp.now()
}));

export { UserPage };
