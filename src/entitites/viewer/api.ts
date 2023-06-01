import { useMutation, useQuery } from '@tanstack/react-query';
import { useServiceContext } from 'app/context/service';

const queryKey = 'auth';

const useGetAuthStatus = () => {
  const { authService } = useServiceContext();
  return useQuery<boolean>([queryKey], () => !!authService.getUser());
};

const useLoginWithEmail = () => {
  const { authService } = useServiceContext();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.loginWithEmailAndPassword(email, password)
  });
};

const useLogout = () => {
  const { authService } = useServiceContext();
  return useMutation({
    mutationFn: authService.logout
  });
};

export { useGetAuthStatus, useLoginWithEmail, useLogout };
