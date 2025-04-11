import {IUser} from '../User';
import {IWaterCard} from '../WaterCard';

export type AddWaterCardParams = {
  waterCard: IWaterCard;
  user: IUser;
  accessToken: string;
};
