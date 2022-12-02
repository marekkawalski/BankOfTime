import { MyToast } from '@/models/MyToast';
import { useState } from 'react';

function useGetMyToast() {
  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
  });
  return { myToast, setMyToast };
}

export default useGetMyToast;
