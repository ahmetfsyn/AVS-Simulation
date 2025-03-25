export interface IWaterCard {
  readonly id: number;
  balance: number;
  readonly cardCompany: string;
  extraBalance: number;
  meterId: number;
}

export class WaterCard implements IWaterCard {
  balance: number = 0;
  extraBalance: number = 0;
  cardCompany: string;
  id: number;
  meterId: number;

  constructor(id: number, meterId: number, cardCompany: string) {
    this.cardCompany = cardCompany;
    this.id = id;
    this.meterId = meterId;
  }
}
