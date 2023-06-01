type AppTheme = 'light' | 'dark';

type Logger = 'file' | 'console';

type TSettings = {
  theme: AppTheme;
  loggers: Logger[];
};

export type { TSettings, AppTheme };
