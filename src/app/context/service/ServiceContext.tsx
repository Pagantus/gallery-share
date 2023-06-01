import { ImageAPI, ImageService } from 'entitites/image';
import { PostAPI, PostService } from 'entitites/post';
import { ProfileAPI, ProfileService } from 'entitites/profile';
import { UserAPI, UserService } from 'entitites/user';
import { AuthAPI, AuthService } from 'entitites/viewer';
import React from 'react';
import { FileService } from 'shared/services/file.service';
import { Logger } from 'shared/services/logger';
import { ConsoleLogger } from 'shared/services/logger';
import { FileLogger } from 'shared/services/logger';

type Services = {
  userService: UserAPI;
  authService: AuthAPI;
  imageService: ImageAPI;
  profileService: ProfileAPI;
  postService: PostAPI;
  logger: Logger;
};

const ServiceContext = React.createContext<Services>(null!);

const useServiceContext = () => React.useContext(ServiceContext);

type ServiceContextProvider = {
  children: React.ReactNode;
};

const ServiceContextProvider: React.FC<ServiceContextProvider> = ({ children }) => {
  const logFileService = new FileService(new Blob(undefined, { type: 'text/plain' }), 'log.txt');
  const consoleLogger = new ConsoleLogger();
  const fileLogger = new FileLogger(logFileService);
  const logger = new Logger([consoleLogger, fileLogger]);

  const userService = new UserService(logger);
  const profileService = new ProfileService(logger, userService);
  const authService = new AuthService(logger, userService, profileService);
  const imageService = new ImageService(logger, userService);
  const postService = new PostService(logger, userService, profileService);

  return (
    <ServiceContext.Provider value={{ userService, authService, imageService, profileService, postService, logger }}>
      {children}
    </ServiceContext.Provider>
  );
};

export { useServiceContext, ServiceContextProvider };
