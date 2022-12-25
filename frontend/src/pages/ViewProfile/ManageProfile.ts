import { Role } from '@/enums/Role';
import { IAppUser } from '@/models/AppUser';

import { IManageProfile } from './types';

export class ManageProfile implements IManageProfile {
  constructor(private userToView: IAppUser, private loggedInUser?: IAppUser) {
    this.userToView = userToView;
    this.loggedInUser = loggedInUser;
  }

  canEdit(): boolean {
    if (
      this.userToView.id === this.loggedInUser?.id ||
      this.loggedInUser?.userType === Role.ROLE_ADMIN
    ) {
      return true;
    } else {
      return false;
    }
  }
}
