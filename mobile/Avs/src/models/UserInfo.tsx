import {IWaterCard} from './WaterCard';
import {IUser} from './User';
import {generateUniqueSevenDigitNumber} from '../utils/generateUniqueSevenDigitNumber';

// Interface
export interface IUserInfo extends IUser {
  subscriberNo?: string;
  address?: string;
  telNo?: string;
  waterCards?: IWaterCard[];
  isAuth: boolean;
}

// Class
export class UserInfo implements IUserInfo {
  id: number;
  address: string;
  subscriberNo: string = generateUniqueSevenDigitNumber();
  telNo: string;
  firstName: string;
  lastName: string;
  tcNo: string;
  waterCards: IWaterCard[] = [];
  password: string = '';
  isAuth: boolean = false;
  constructor(
    id: number,
    address: string,
    telNo: string,
    firstName: string,
    lastName: string,
    tcNo: string,
  ) {
    this.id = id;
    this.address = address;
    this.firstName = firstName;
    this.lastName = lastName;
    this.telNo = telNo;
    this.tcNo = tcNo;
  }
}
