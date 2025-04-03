export type RegisterParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  roles: ['User'];
  username: string;
};

export type LoginParams = {
  email: string;
  password: string;
};
