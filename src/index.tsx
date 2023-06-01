import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './app/App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider, theme } from 'antd';
import { ServiceContextProvider } from './app/context/service';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#cf404d',
            wireframe: false,
            borderRadius: 0,
            borderRadiusSM: 0,
            colorBorderSecondary: '#d9d9d9'
          }
        }}>
        <ServiceContextProvider>
          <App />
        </ServiceContextProvider>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
