import { APP_USER, AUTHENTICATION_TOKEN } from '@/constants/constants';
import axios from 'axios';

export const interceptRequests = () => {
  console.log("before interceptor");
  const token = sessionStorage.getItem(AUTHENTICATION_TOKEN);
  axios.interceptors.request.use((request) => {
    if (sessionStorage.getItem(APP_USER) && token != null && request.headers) {
      request.headers.authorization = token;
      console.log("Inside interceptor");
    }
    return request;
  });
};
