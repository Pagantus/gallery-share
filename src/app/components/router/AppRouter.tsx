import React from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

type AppRouterProps = {
  routes: RouteObject[];
};

const AppRouter: React.FC<AppRouterProps> = ({ routes }) => {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export { AppRouter };
