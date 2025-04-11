import {ICreditCard} from '../CreditCard';
import {IWaterCard} from '../WaterCard';

export type UpdateWaterCardParams = {
  waterCard: IWaterCard;
  updatedWaterCard?: IWaterCard;
  accessToken?: string;
  userId?: string;
  creditCard: ICreditCard;
};
