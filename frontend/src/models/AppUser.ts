export interface IAppUserToRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
  aboutMe?: string;
}

export interface IAppUserToUpdate {
  readonly id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
  aboutMe?: string;
}
export interface IAppUser extends IAppUserToRegister {
  readonly id: number;
  readonly userType: string;
}
