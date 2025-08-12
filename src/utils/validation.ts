/**
 * Temporary lightweight validation utilities for the Quote flow.
 * If Zod installation is approved later, we will replace these with Zod schemas.
 */

export type QuoteBasics = {
  zip: string;
  state: 'FL' | 'MI' | 'NC' | 'OTHER';
  coverageType: 'Health' | 'Life' | 'Both';
};

export type QuoteHousehold = {
  ages: number[]; // primary and dependents
  tobacco: boolean;
  dependents: number; // count
};

export type QuoteContact = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
};

export function validateZip(zip: string) {
  return /^\d{5}$/.test(zip.trim());
}

export function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, '').slice(0, 15);
  return digits;
}

export function validatePhone(phone: string) {
  const digits = normalizePhone(phone);
  // US simple rule for now
  return /^\d{10}$/.test(digits);
}

export function required(value: unknown) {
  return !(value === undefined || value === null || (typeof value === 'string' && value.trim() === ''));
}

export function validateBasics(b: QuoteBasics) {
  const errors: Partial<Record<keyof QuoteBasics, string>> = {};
  if (!validateZip(b.zip)) errors.zip = 'Enter a valid 5-digit ZIP code';
  if (!b.state) errors.state = 'Select a state';
  if (!b.coverageType) errors.coverageType = 'Select a coverage type';
  return errors;
}

export function validateHousehold(h: QuoteHousehold) {
  const errors: Partial<Record<keyof QuoteHousehold, string>> = {};
  if (!Array.isArray(h.ages) || h.ages.length === 0) errors.ages = 'Provide at least one age';
  if (h.ages.some((n) => isNaN(n) || n <= 0)) errors.ages = 'Ages must be positive numbers';
  if (h.dependents < 0) errors.dependents = 'Dependents cannot be negative';
  return errors;
}

export function validateContact(c: QuoteContact) {
  const errors: Partial<Record<keyof QuoteContact, string>> = {};
  if (!required(c.firstName)) errors.firstName = 'First name is required';
  if (!required(c.lastName)) errors.lastName = 'Last name is required';
  if (!validateEmail(c.email)) errors.email = 'Enter a valid email';
  if (!validatePhone(c.phone)) errors.phone = 'Enter a valid 10-digit phone';
  if (!c.consent) errors.consent = 'Consent is required';
  return errors;
}