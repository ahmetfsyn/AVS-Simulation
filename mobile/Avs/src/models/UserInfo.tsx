import {IWaterCard} from './WaterCard';
import {IUser} from './User';
import {generateUniqueSevenDigitNumber} from '../utils/generateUniqueSevenDigitNumber';

// Interface
export interface IUserInfo extends IUser {
  subscriberNo?: string;
  address: string | null;
  telNo: string | null;
  waterCards: IWaterCard[];
  isAuth: boolean;

  toJson: () => object;
}

// Class
export class UserInfo implements IUserInfo {
  id: number;
  address: string | null;
  subscriberNo: string;
  telNo: string | null;
  firstName: string;
  lastName: string;
  tcNo: string;
  waterCards: IWaterCard[] = [];
  password: string = '';
  isAuth: boolean = false;
  constructor(
    id: number,
    address: string | null,
    telNo: string | null,
    firstName: string,
    lastName: string,
    tcNo: string,
    subscriberNo: string,
  ) {
    this.id = id;
    this.address = address;
    this.firstName = firstName;
    this.lastName = lastName;
    this.telNo = telNo;
    this.tcNo = tcNo;
    this.subscriberNo = subscriberNo;
  }
  toJson(): object {
    return {
      id: this.id,
      address: this.address,
      subscriberNo: this.subscriberNo,
      telNo: this.telNo,
      firstName: this.firstName,
      lastName: this.lastName,
      tcNo: this.tcNo,
      isAuth: this.isAuth,
      waterCards: this.waterCards,
    };
  }
}
