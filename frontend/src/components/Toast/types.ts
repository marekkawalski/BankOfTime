import { MyToast } from '@/models/MyToast';

export interface MyToastComponentProps {
  myToast?: MyToast;
  setMyToast: React.Dispatch<React.SetStateAction<MyToast>>;
}
