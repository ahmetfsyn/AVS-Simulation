export type RegisterParams = {
  firstName: string;
  lastName: string;
  tcNo: string;
  password: string;
  confirmPassword: string;
  roles?: string[];
  username?: string;
};

export type LoginParams = {
  tcNo: string;
  password: string;
  rememberMe?: boolean;
};
