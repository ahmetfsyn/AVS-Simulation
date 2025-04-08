import {IUser} from '../User';

export type LoginPayload = {
  userDto: IUser;
  tokenDto: {
    accessToken: string;
    refreshToken: string;
  };
};
