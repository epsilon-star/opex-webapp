/**
 * Utilities for Persian numbers, currency, and locale formatting.
 */

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const ENGLISH_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * Converts English numbers/digits in any string or number to Persian format.
 */
export function toPersianNumber(input: number | string | undefined | null): string {
  if (input === undefined || input === null) return '';
  const str = String(input);
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const index = ENGLISH_DIGITS.indexOf(char);
    if (index !== -1) {
      result += PERSIAN_DIGITS[index];
    } else if (char === '.') {
      result += '٫'; // Persian decimal separator
    } else {
      result += char;
    }
  }
  return result;
}

/**
 * Formats currency/budget into translated text (e.g. ۳۴ میلیارد ریال or ۲٫۴ میلیون دلار)
 */
export function formatPersianCurrency(value: number): string {
  if (value >= 1000000) {
    return toPersianNumber((value / 1000000).toFixed(1)) + ' میلیون دلار';
  }
  return toPersianNumber(value.toLocaleString('fa-IR'));
}
