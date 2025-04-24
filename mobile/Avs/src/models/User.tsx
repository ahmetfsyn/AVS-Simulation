export interface IUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  tcNo?: string;
  subscriberNo?: string;
  email?: string;
  phoneNumber?: string;
  emailConfirmed?: boolean;
  isBanned?: boolean;
  twoFactorEnabled?: boolean;
}
