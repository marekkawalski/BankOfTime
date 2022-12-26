import { IAppUser } from '@/models/AppUser';

export interface AppUserRequestParams {
  sortFieldUrl?: string;
  pageSizeUrl?: string;
  pageNumUrl?: string;
}
export interface AppUsersData {
  content: IAppUser[];
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
}
