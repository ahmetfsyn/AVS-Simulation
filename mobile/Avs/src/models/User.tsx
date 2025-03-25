// Interface
export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  tcNo: string;
  password: string;

  toJson(): object;
}
// Class
export class User implements IUser {
  id: number;
  firstName: string;
  lastName: string;
  tcNo: string;
  password: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    tcNo: string,
    password: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.tcNo = tcNo;
    this.password = password;
  }
  toJson(): object {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      tcNo: this.tcNo,
      password: this.password,
    };
  }
}
