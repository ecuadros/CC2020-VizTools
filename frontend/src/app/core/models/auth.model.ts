import { UserModel, UserInfoModel, InstitutionModel } from '.';

export class LoginModel {
  email!: string;
  password!: string;

  constructor(init?: Partial<LoginModel>) {
    Object.assign(this, init);
  }
}

export class RegisterModel {
  user?: UserModel;
  userInfo?: UserInfoModel;
  institution?: InstitutionModel;

  constructor(init?: Partial<RegisterModel>) {
    Object.assign(this, init);
  }
}

export class AuthTokenModel {
  token!: string;
  name!: string;
  email!: string;
  institutionId!: number;
  institutionName!: string;

  constructor(init?: Partial<AuthTokenModel>) {
    Object.assign(this, init);
  }
}
