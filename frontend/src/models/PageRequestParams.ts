export interface PageRequestData {
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: any;
  size: number;
  sort: any;
  totalElements: number;
  totalPages: number;
  content: unknown[];
}
export interface PageRequestParams {
  sortFieldUrl?: string;
  pageSizeUrl?: string;
  pageNumUrl?: string;
  sortDirectionUrl?: string;
  keywordUrl?: string;
}
export interface OfferRequestParams extends PageRequestParams {
  offerTypeUrl?: string;
  offerStatusUrl?: string;
  categoryUrl?: string;
}
