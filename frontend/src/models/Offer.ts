export interface ICreateOffer {
  title: string;
  shortDescription: string;
  price: number;
  offerType: string;
}
export interface IOffer extends ICreateOffer {
  longDescription?: string;
  state?: string;
  location?: string;
}
