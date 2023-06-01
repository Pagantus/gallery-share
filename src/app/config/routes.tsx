import { MainLayout } from 'app/components/layout';
import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { ROUTES } from 'shared/constants/pages/routes';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

const GalleryPage = React.lazy(() => import('pages/gallery'));
const ViewerPage = React.lazy(() => import('pages/viewer'));

const pubicRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <React.Suspense fallback='Loadingggggg'>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
              <Outlet />
            </QueryParamProvider>
          </React.Suspense>
        ),
        children: [
          {
            path: ROUTES.VIEWER,
            element: <ViewerPage />
          },
          {
            path: ROUTES.GALLERY,
            element: <GalleryPage />
          }
        ]
      }
    ]
  }
];

const privateRoutes: RouteObject[] = [...pubicRoutes];

export { pubicRoutes, privateRoutes };
