import { IAppUser } from '@/models/AppUser';
import { PageRequestData } from '@/types/pageRequestParams';

export interface AppUserRequestParams {
  sortFieldUrl?: string;
  pageSizeUrl?: string;
  pageNumUrl?: string;
}
export interface AppUsersData extends PageRequestData {
  content: IAppUser[];
}
