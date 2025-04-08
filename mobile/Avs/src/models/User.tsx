// Interface
export interface IUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  tcNo?: string;

  toJson(): object;
}
// Class
export class User implements IUser {
  id: string;
  firstName: string;
  lastName: string;
  tcNo: string;

  constructor(id: string, firstName: string, lastName: string, tcNo: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.tcNo = tcNo;
  }
  toJson(): object {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      tcNo: this.tcNo,
    };
  }
}
