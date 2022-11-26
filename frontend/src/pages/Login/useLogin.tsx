import { useNavigate } from 'react-router-dom';

import { useServices } from '../../context/ServicesContext';
import { UseLoginProps } from './types';

function useLogin({ email, password, setMyToast }: UseLoginProps) {
  const navigate = useNavigate();
  const services = useServices();

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
      setMyToast({
        background: "danger",
        message: e.message,
        title: "Error",
        show: true,
      });
    }
  };
  return loginClicked;
}

export default useLogin;
