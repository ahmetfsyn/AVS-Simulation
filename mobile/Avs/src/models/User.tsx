// Interface
export interface IUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  tcNo?: string;
  subscriberNo?: string;

  toJson(): object;
}
// Class
export class User implements IUser {
  id: string;
  firstName: string;
  lastName: string;
  tcNo: string;
  subscriberNo: string;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    tcNo: string,
    subscriberNo: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.tcNo = tcNo;
    this.subscriberNo = subscriberNo;
  }
  toJson(): object {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      tcNo: this.tcNo,
      subscriberNo: this.subscriberNo,
    };
  }
}
