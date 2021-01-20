import { University } from './university.model';

export class UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }

}

export class UserInfo {
  countryId: number;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  whatsApp: boolean;
  telegram: boolean;
  occupation: string;

  constructor() {
    this.countryId = undefined;
    this.city = '';
    this.state = '';
    this.zipCode = '';
    this.phone = '';
    this.whatsApp = false;
    this.telegram = false;
    this.occupation = '';
  }

}

export class UserDetails {
  userInfo: UserInfo;
  university: University;
  universityUrlTemp: string;

  constructor() {
    this.userInfo = new UserInfo();
    this.university = new University();
    this.universityUrlTemp = '';
  }

}
