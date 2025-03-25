import {v4 as uuidv4} from 'uuid';

export function generateUniqueSevenDigitNumber(): string {
  const uuid = uuidv4().replace(/\D/g, '');
  return Number(uuid.slice(0, 7)).toString();
}
