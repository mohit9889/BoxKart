/**
 * Common validation rules and helpers for forms.
 */

export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\d{10}$/,
  PINCODE: /^\d{6}$/,
  // Password: at least 8 characters, 1 uppercase, 1 special character
  PASSWORD_STRONG: /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
};

export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!VALIDATION_RULES.EMAIL.test(email))
    return 'Please enter a valid email address';
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return 'Phone number is required';
  if (!VALIDATION_RULES.PHONE.test(phone))
    return 'Please enter a valid 10-digit phone number';
  return null;
};

export const validatePincode = (pincode) => {
  if (!pincode) return 'Pincode is required';
  if (!VALIDATION_RULES.PINCODE.test(pincode))
    return 'Please enter a valid 6-digit pincode';
  return null;
};

export const validatePasswordStrong = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters long';
  if (!/(?=.*[A-Z])/.test(password))
    return 'Password must contain at least one uppercase letter';
  if (!/(?=.*[!@#$%^&*])/.test(password))
    return 'Password must contain at least one special character (!@#$%^&*)';
  return null;
};

export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || value.trim() === '') return `${fieldName} is required`;
  return null;
};
