import { IAppUser } from '../../models/AppUser';

export interface IManageProfile {
  canEdit(): boolean;
}

export interface UseGetUserToViewProps {
  appUser?: IAppUser;
}
