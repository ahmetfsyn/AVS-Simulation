export class NdefError extends Error {
  constructor(message: string = 'Nfc işlemi başarısız.') {
    super(message);
  }
}
