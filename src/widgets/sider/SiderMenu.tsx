import { Menu, MenuProps } from 'antd';
import React from 'react';
import { ROUTES } from 'shared/constants/pages/routes';
import { TITLES } from 'shared/constants/pages/titles';
import { CustomLink } from 'shared/components';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.css';

type MenuItem = Required<MenuProps>['items'][number];
type RouteType = (typeof ROUTES)[keyof typeof ROUTES];

const getMenuItem = (route: RouteType): MenuItem => {
  return {
    key: route,
    label: (
      <div className={styles.wrapper}>
        <CustomLink to={route}>{TITLES[route]}</CustomLink>
      </div>
    )
  };
};

const items: MenuItem[] = [getMenuItem(ROUTES.VIEWER), getMenuItem(ROUTES.GALLERY)];

const SiderMenu: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Menu
      style={{ fontWeight: 600, border: 'none' }}
      mode='inline'
      items={items}
      selectedKeys={[pathname]}
    />
  );
};

export { SiderMenu };
