export type MyToast = {
  show?: boolean;
  title?: string;
  background?: string;
  message?: string;
};
export interface IMyToast {
  myToast: MyToast;
  setMyToast: React.Dispatch<React.SetStateAction<MyToast>>;
}
