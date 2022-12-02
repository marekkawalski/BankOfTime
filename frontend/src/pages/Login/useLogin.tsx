import { useNavigate } from 'react-router-dom';

import { useServices } from '../../context/ServicesContext';
import { useMyToast } from '../../context/ToastContext';
import { ToastBackground } from '../../enums/ToastBackground';
import { ToastTitle } from '../../enums/ToastTitle';
import { UseLoginProps } from './types';

function useLogin({ email, password }: UseLoginProps) {
  const navigate = useNavigate();
  const services = useServices();
  const toast = useMyToast();

  const loginClicked = async () => {
    try {
      if (!services) return;
      const resp =
        await services.authenticationService.executeBasicAuthenticationService(
          email,
          password
        );
      console.log(resp);
      navigate("/");
    } catch (e: any) {
      console.log(e);
      toast?.make(ToastTitle.ERROR, ToastBackground.ERROR, e.message);
    }
  };
  return loginClicked;
}

export default useLogin;
