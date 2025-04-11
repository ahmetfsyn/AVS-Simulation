export interface IWaterCard {
  id?: string;
  subscriberNo?: string;
  credit: number;
  meterNo?: number;
}

export class WaterCard implements IWaterCard {
  id: string;
  subscriberNo: string = '';
  credit: number = 0;
  meterNo: number;

  constructor(id: string, meterNo: number, subscriberNo: string) {
    this.id = id;
    this.meterNo = meterNo;
    this.subscriberNo = subscriberNo;
  }
}
