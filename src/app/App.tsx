import React from 'react';
import { AppRouter } from './components/router';
import { privateRoutes, pubicRoutes } from './config/routes';
import { useServiceContext } from './context/service';

const App: React.FC = () => {
  const { authService } = useServiceContext();
  const isAuth = !!authService.getUser();
  const routes = isAuth ? privateRoutes : pubicRoutes;
  return <AppRouter routes={routes} />;
};

export { App };
