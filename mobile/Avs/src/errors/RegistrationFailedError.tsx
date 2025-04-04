export class RegistrationFailedError extends Error {
  constructor(message: string = 'Kayıt başarısız.') {
    super(message);
  }
}
