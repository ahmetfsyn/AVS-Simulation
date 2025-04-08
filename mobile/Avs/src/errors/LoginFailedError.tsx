export class LoginFailedError extends Error {
  constructor(message: string = 'Giriş başarısız.') {
    super(message);
  }
}
