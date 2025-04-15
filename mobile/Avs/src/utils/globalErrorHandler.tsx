// utils/globalErrorHandler.ts
import {showMessage} from './showMessage';

export function handleGlobalError(
  error: unknown,
  fallbackMessage = 'Bir hata oluştu',
) {
  const message =
    (error as any)?.response?.data?.message ||
    (error as any)?.message ||
    fallbackMessage;

  console.error('[GLOBAL ERROR]', error);

  showMessage({
    text1: 'İşlem Başarısız',
    text2: message,
    type: 'error',
  });
}
