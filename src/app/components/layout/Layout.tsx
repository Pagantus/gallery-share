import { ConfigProvider, Layout, theme, Typography } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTitle } from 'shared/lib/hooks/useTitle';
import styles from './styles.module.css';

import { SiderMenu } from 'widgets/sider';

const MainLayout: React.FC = () => {
  const { token } = theme.useToken();
  const title = useTitle();

  return (
    <Layout>
      <Layout.Sider
        width={328}
        style={{ background: '#2d3e4f' }}>
        <div className={styles.siderContainer}>
          <div className={styles.user}></div>
          <div className={styles.title}>
            <ConfigProvider theme={{ token: { fontSize: 30, colorText: token.colorPrimary } }}>
              <Typography.Text strong>Gallery Share</Typography.Text>
            </ConfigProvider>
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorBgBase: '#2d3e4f',
                colorText: '#fff',
                fontSize: 15,
                colorPrimaryBg: '#00000021'
              }
            }}>
            <SiderMenu />
          </ConfigProvider>
        </div>
      </Layout.Sider>
      <Layout>
        <Layout.Content style={{ background: '#fff' }}>
          <div className={styles.contentWrapper}>
            <div className={styles.contentContainer}>
              <Outlet />
            </div>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export { MainLayout };
