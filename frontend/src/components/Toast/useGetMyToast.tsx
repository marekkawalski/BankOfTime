import { useState } from 'react';

import { MyToast } from '../../models/MyToast';

function useGetMyToast() {
  const [myToast, setMyToast] = useState<MyToast>({
    show: false,
  });
  return { myToast, setMyToast };
}

export default useGetMyToast;
