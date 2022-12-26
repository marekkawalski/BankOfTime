import { Role } from '../enums/Role';

export interface IAppUserToRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
  aboutMe?: string;
  occupation?: string;
}

export interface IAppUserToUpdate extends IAppUserToRegister {
  readonly id: number;
  userRole: Role;
}

export interface IAppUser extends IAppUserToRegister {
  readonly id: number;
  readonly userType: string;
  enabled: boolean;
}
