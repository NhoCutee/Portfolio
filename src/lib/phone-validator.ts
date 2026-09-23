/**
 * Phone number validation and anti-spam utility
 * Supports:
 * - Vietnamese Mobile Networks (Viettel, Mobifone, Vinaphone, Vietnamobile, Gmobile, I-Telecom, Wintel)
 * - Vietnamese Landlines (02x)
 * - International standard E.164 (+CountryCode + Subscriber Number)
 * - Filters out junk/spam/fake numbers (repeated digits, sequential test numbers, non-existent prefixes)
 */

// Official Vietnamese Mobile prefixes (10 digits)
// Viettel: 086, 096, 097, 098, 032-039
// Mobifone: 089, 090, 093, 070, 076-079
// Vinaphone: 088, 091, 094, 081-085
// Vietnamobile: 092, 052, 056, 058
// Gmobile: 099, 059
// I-Telecom: 087
// Wintel: 055
const VIETNAMESE_MOBILE_REGEX =
  /^(0|84|\+84)(3[2-9]|5[25689]|7[06-9]|8[1-9]|9[0-46-9])[0-9]{7}$/;

// Vietnamese Landline prefixes (11 digits: 02x + 8 digits)
const VIETNAMESE_LANDLINE_REGEX = /^(0|84|\+84)(2[0-9]{1,2})[0-9]{7,8}$/;

// International E.164: + followed by 8 to 15 digits
const INTERNATIONAL_REGEX = /^\+[1-9][0-9]{7,14}$/;

// Common test/fake numbers to immediately block
const KNOWN_JUNK_NUMBERS = new Set([
  '0123456789',
  '1234567890',
  '9876543210',
  '0987654321',
  '012345678',
  '123456789',
  '0000000000',
  '1111111111',
  '2222222222',
  '3333333333',
  '4444444444',
  '5555555555',
  '6666666666',
  '7777777777',
  '8888888888',
  '9999999999',
]);

export function validatePhoneNumber(rawPhone?: string): {
  isValid: boolean;
  message?: string;
  cleaned?: string;
} {
  if (!rawPhone || rawPhone.trim() === '') {
    return { isValid: true };
  }

  // Remove common separators (spaces, dots, hyphens, parentheses)
  const cleaned = rawPhone.replace(/[\s\-.()]/g, '');

  // Extract only digits to check patterns
  const digitsOnly = cleaned.replace(/\D/g, '');

  // Check 1: Length check (ITU-T E.164 specifies between 8 and 15 digits)
  if (digitsOnly.length < 8 || digitsOnly.length > 15) {
    return {
      isValid: false,
      message:
        'Phone number length is invalid (must be between 8 and 15 digits).',
    };
  }

  // Check 2: Known fake sequential or repeated numbers
  if (KNOWN_JUNK_NUMBERS.has(digitsOnly)) {
    return {
      isValid: false,
      message: 'This appears to be a fake or test phone number.',
    };
  }

  // Check 3: All same digits (e.g. 0000000000, 1111111111)
  if (/^(\d)\1+$/.test(digitsOnly)) {
    return {
      isValid: false,
      message: 'Phone number cannot consist of repeated identical digits.',
    };
  }

  // Check 4: Last 7 digits are identical (e.g. 0900000000, 0911111111)
  const last7 = digitsOnly.slice(-7);
  if (/^(\d)\1{6}$/.test(last7)) {
    return {
      isValid: false,
      message: 'Phone number appears to be invalid or spam.',
    };
  }

  // Check 5: Variety of digits (real phone numbers have at least 3-4 distinct digits)
  const uniqueDigits = new Set(digitsOnly.split(''));
  if (uniqueDigits.size <= 2 && digitsOnly.length >= 9) {
    return {
      isValid: false,
      message: 'Phone number does not contain enough distinct digits.',
    };
  }

  // Check 6: Vietnamese format check
  const isVNNumber =
    cleaned.startsWith('0') ||
    cleaned.startsWith('84') ||
    cleaned.startsWith('+84');

  if (isVNNumber) {
    const isMobile = VIETNAMESE_MOBILE_REGEX.test(cleaned);
    const isLandline = VIETNAMESE_LANDLINE_REGEX.test(cleaned);

    if (isMobile || isLandline) {
      return { isValid: true, cleaned };
    }

    return {
      isValid: false,
      message:
        'Invalid Vietnamese phone number prefix or length (e.g. 09x, 03x, 07x, 08x, 05x).',
    };
  }

  // Check 7: International format (+CountryCode)
  if (cleaned.startsWith('+')) {
    if (INTERNATIONAL_REGEX.test(cleaned)) {
      return { isValid: true, cleaned };
    }
    return {
      isValid: false,
      message: 'Invalid international phone number format (+CountryCode).',
    };
  }

  // If entered without country code or leading 0, check general validity
  if (/^[1-9][0-9]{7,14}$/.test(cleaned)) {
    return { isValid: true, cleaned };
  }

  return {
    isValid: false,
    message: 'Please enter a valid phone number.',
  };
}
