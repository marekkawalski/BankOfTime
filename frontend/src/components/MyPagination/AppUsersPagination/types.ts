import { AppUserRequestParams, AppUsersData } from '@/pages/Admin/ManageUsers/types';

export interface AppUsersPaginationProps {
  appUsersData: AppUsersData | null;
  handleGetAppUsers: (
    appUsersRequestParams: AppUserRequestParams
  ) => Promise<void>;
}
