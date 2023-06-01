import { Avatar, Card, Space, Typography } from 'antd';
import React from 'react';
import { TProfileData } from 'shared/types/profile';
import { TUserData } from 'shared/types/user';
import styles from './styles.module.css';

type ProfileHeaderProps = {
  username: TUserData['username'];
  background: TProfileData['background'];
  avatar: TProfileData['avatar'];
  status: TProfileData['status'];
  backgroundActions: React.ReactNode[];
  profileActions: React.ReactNode[];
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  background,
  avatar,
  status,
  username,
  backgroundActions,
  profileActions
}) => {
  return (
    <Card
      bodyStyle={{ padding: 0 }}
      bordered>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${background})` }}>
        {backgroundActions}
      </div>
      <div className={styles.info}>
        <div className={styles.infoContainer}>
          <div className={styles.avatarContainer}>
            <Avatar
              size={256}
              src={avatar?.url}
            />
          </div>
          <div className={styles.userDataContainer}>
            <Typography.Title key='asda'>{username}</Typography.Title>
            <Typography.Text key='asdasdasda'>{status}</Typography.Text>
          </div>
          <Space>{profileActions}</Space>
        </div>
      </div>
    </Card>
  );
};

export { ProfileHeader };
