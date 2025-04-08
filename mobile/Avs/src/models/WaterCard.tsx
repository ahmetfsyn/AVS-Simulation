export interface IWaterCard {
  id: number;
  // cardCompany: string;
  subscriberNo: string;
  credit: number;
  meterId: number;
}

export class WaterCard implements IWaterCard {
  id: number;
  subscriberNo: string;
  credit: number = 0;
  meterId: number;

  constructor(id: number, meterId: number, subscriberNo: string) {
    this.id = id;
    this.meterId = meterId;
    this.subscriberNo = subscriberNo;
  }
}
