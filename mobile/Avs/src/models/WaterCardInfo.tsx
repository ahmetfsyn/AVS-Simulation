import {IWaterCard} from './WaterCard';

export interface IWaterCardInfo extends IWaterCard {
  subscriberNo: string;
}

export class WaterCardInfo implements IWaterCardInfo {
  balance: number;
  cardCompany: string;
  extraBalance: number;
  id: number;
  meterId: number;
  subscriberNo: string;

  constructor(
    id: number,
    balance: number,
    cardCompany: string,
    extraBalance: number,
    meterId: number,
    subscriberNo: string,
  ) {
    this.id = id;
    this.balance = balance;
    this.extraBalance = extraBalance;
    this.cardCompany = cardCompany;
    this.meterId = meterId;
    this.subscriberNo = subscriberNo;
  }
}
