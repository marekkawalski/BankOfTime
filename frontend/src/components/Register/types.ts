import { IAppUser } from '@/models/AppUser';

import { Role } from '../../enums/Role';

export interface RegisterProps {
  appUser?: IAppUser;
  submit: any;
  loading: boolean;
}
export interface ValuesProps {
  readonly id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  city?: string;
  country?: string;
  aboutMe?: string;
  phone?: string;
  occupation?: string;
  userRole?: Role;
}

export interface UseUpdateUserProps {
  readonly userId: number;
}
