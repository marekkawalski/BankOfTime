import { IAppUser } from '@/models/AppUser';

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
}

export interface UseUpdateUserProps {
  readonly userId: number;
}
