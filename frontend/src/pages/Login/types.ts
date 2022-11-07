import { MyToast } from "../../models/MyToast";

export interface UseLoginProps {
  email: string;
  password: string;
  setMyToast: React.Dispatch<React.SetStateAction<MyToast>>;
}
