/**
 * Email validation and anti-spam / disposable email filter
 * Features:
 * - RFC compliant syntax validation
 * - Filters out known disposable / temporary email providers (10minutemail, tempmail, mailinator, guerrillamail, yopmail, etc.)
 * - Blocks dummy / placeholder / test addresses (test@test.com, asdf@..., admin@admin.com, etc.)
 * - Blocks keyboard smash / junk patterns (qwerty, asdfghjkl, repeated characters)
 * - Validates domain structure and TLD
 */

// Popular disposable / temporary / throwaway email domains
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  '10minutemail.com',
  '10minutemail.net',
  '20minutemail.com',
  'burnermail.io',
  'cool.fr.nf',
  'crazymailing.com',
  'discard.email',
  'discardmail.com',
  'dispostable.com',
  'dropmail.me',
  'emailondeck.com',
  'fakeinbox.com',
  'fakemail.net',
  'fakemailgenerator.com',
  'generator.email',
  'getairmail.com',
  'getnada.com',
  'grr.la',
  'guerrillamail.biz',
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamailblock.com',
  'harakirimail.com',
  'inboxbear.com',
  'inboxkitten.com',
  'jetable.fr.nf',
  'luxusmail.org',
  'mailcatch.com',
  'maildrop.cc',
  'mailinator.com',
  'mailnesia.com',
  'minuteinbox.com',
  'mohmal.com',
  'mytemp.email',
  'mytempmail.com',
  'nada.ltd',
  'sharklasers.com',
  'spambog.com',
  'tempail.com',
  'tempmail.com',
  'tempmail.net',
  'temp-mail.org',
  'tempr.email',
  'throwawaymail.com',
  'trashmail.com',
  'trashmail.me',
  'trashmail.net',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.net',
  'zillamail.com',
]);

// Dummy test domains
const BLOCKED_DOMAINS = new Set([
  'example.com',
  'example.org',
  'example.net',
  'test.com',
  'test.org',
  'test.net',
  'fake.com',
  'fake.org',
  'invalid.com',
  'sample.com',
  'domain.com',
  'localhost',
  'mailinator.net',
]);

// Exact blocked test addresses
const BLOCKED_EXACT_EMAILS = new Set([
  'test@test.com',
  'test@gmail.com',
  'test@yahoo.com',
  'test@outlook.com',
  'admin@admin.com',
  'admin@gmail.com',
  'abc@abc.com',
  'abc@gmail.com',
  'asdf@asdf.com',
  'asdf@gmail.com',
  'user@example.com',
  'fake@fake.com',
  'fake@gmail.com',
  '123@123.com',
  '123@gmail.com',
  'sample@sample.com',
  'example@example.com',
  'demo@demo.com',
  'hello@test.com',
]);

// Spam / keyboard mash local-parts
const SUSPICIOUS_LOCAL_PARTS = new Set([
  'asdf',
  'asdfg',
  'asdfgh',
  'asdfghj',
  'asdfghjk',
  'asdfghjkl',
  'qwerty',
  'qwertyu',
  'qwertyuiop',
  'zxcvbnm',
  '12345',
  '123456',
  '1234567',
  '12345678',
  '123456789',
  '0123456789',
  'testing',
  'tester',
]);

export function validateEmail(rawEmail?: string): {
  isValid: boolean;
  message?: string;
  cleaned?: string;
} {
  if (!rawEmail || rawEmail.trim() === '') {
    return {
      isValid: false,
      message: 'Email address is required.',
    };
  }

  const cleaned = rawEmail.trim().toLowerCase();

  // Check 1: Length constraints
  if (cleaned.length < 5 || cleaned.length > 254) {
    return {
      isValid: false,
      message: 'Email address length is invalid.',
    };
  }

  // Check 2: Must contain exactly one '@'
  const parts = cleaned.split('@');
  if (parts.length !== 2) {
    return {
      isValid: false,
      message: 'Please enter a valid email address.',
    };
  }

  const [localPart, domain] = parts;

  // Check 3: Check against exact blocked test emails
  if (BLOCKED_EXACT_EMAILS.has(cleaned)) {
    return {
      isValid: false,
      message: 'This email appears to be a placeholder or test address.',
    };
  }

  // Check 4: Syntax structure validation
  // Local part: allowed letters, digits, dots, hyphens, underscores, plus
  // Domain: allowed letters, digits, hyphens, dots
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(cleaned)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address format.',
    };
  }

  // Check 5: No consecutive dots
  if (cleaned.includes('..')) {
    return {
      isValid: false,
      message: 'Email address cannot contain consecutive dots.',
    };
  }

  // Check 6: Local-part spam heuristics
  if (localPart.length < 2) {
    return {
      isValid: false,
      message: 'Email username is too short.',
    };
  }

  // Check if local-part is all the same character (e.g. aaaaa, 11111)
  if (/^([a-zA-Z0-9])\1+$/.test(localPart)) {
    return {
      isValid: false,
      message: 'Email username cannot be repeated identical characters.',
    };
  }

  // Check if local-part is a known keyboard smash or test word
  if (SUSPICIOUS_LOCAL_PARTS.has(localPart)) {
    return {
      isValid: false,
      message: 'This email address appears to be invalid or spam.',
    };
  }

  // Check 7: Domain validation
  // Check against dummy/test domains
  if (BLOCKED_DOMAINS.has(domain)) {
    return {
      isValid: false,
      message: 'Emails from example or test domains are not accepted.',
    };
  }

  // Check against disposable / temporary email providers
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: false,
      message:
        'Temporary or disposable email addresses are not accepted. Please use a permanent email.',
    };
  }

  // Check TLD: must have at least 2 chars and be letters
  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  if (!tld || tld.length < 2 || !/^[a-z]+$/.test(tld)) {
    return {
      isValid: false,
      message: 'Email domain has an invalid top-level domain (TLD).',
    };
  }

  return { isValid: true, cleaned };
}
