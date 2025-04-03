export interface IWaterCard {
  readonly id: number;
  readonly cardCompany: string;
  credit: number;
  meterId: number;
}

export class WaterCard implements IWaterCard {
  id: number;
  cardCompany: string;
  credit: number = 0;
  meterId: number;

  constructor(id: number, meterId: number, cardCompany: string) {
    this.id = id;
    this.meterId = meterId;
    this.cardCompany = cardCompany;
  }
}
