import { MyToast } from '@/models/MyToast';
import { createContext, useContext, useState } from 'react';

import { ToastContextProps, ToastContextProviderProps } from './types';

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export default function ToastContextProvider({
  children,
}: ToastContextProviderProps) {
  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
  });

  const makeToast = (title: string, background: string, message: string) => {
    setMyToast({
      title: title,
      background: background,
      message: message,
      show: true,
    });
  };
  return (
    <ToastContext.Provider
      value={{
        get: myToast,
        set: setMyToast,
        make: makeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}
export function useMyToast() {
  return useContext(ToastContext);
}
