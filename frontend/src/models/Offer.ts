export interface ICreateOffer {
  title: string;
  shortDescription: string;
  price: number;
  offerType: string;
}
export interface IOffer extends ICreateOffer {
  readonly id: number;
  longDescription?: string;
  state?: string;
  location?: string;
}
