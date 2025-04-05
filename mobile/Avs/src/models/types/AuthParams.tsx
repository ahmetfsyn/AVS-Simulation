export type RegisterParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  roles?: string[];
  username?: string;
};

export type LoginParams = {
  email: string;
  password: string;
  rememberMe?: boolean;
};
