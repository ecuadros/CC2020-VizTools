
export class UserModel {
  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;

  constructor(init?: Partial<UserModel>) {
    Object.assign(this, init);
  }
}

export class UserInfoModel {
  institutionId?: number;
  countryId?: number;
  city?: string;
  occupation?: string;

  constructor(init?: Partial<UserInfoModel>) {
    Object.assign(this, init);
  }
}
