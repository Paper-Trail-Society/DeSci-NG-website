export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export function validateEmail(email: string): ValidationError | null {
  if (!email) {
    return { field: "email", message: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { field: "email", message: "Please enter a valid email address" };
  }

  return null;
}

export function validatePassword(password: string): ValidationError | null {
  if (!password) {
    return { field: "password", message: "Password is required" };
  }

  if (password.length < 8) {
    return {
      field: "password",
      message: "Password must be at least 8 characters long",
    };
  }

  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return {
      field: "password",
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    };
  }

  return null;
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): ValidationError | null {
  if (!confirmPassword) {
    return {
      field: "confirmPassword",
      message: "Please confirm your password",
    };
  }

  if (password !== confirmPassword) {
    return { field: "confirmPassword", message: "Passwords do not match" };
  }

  return null;
}

export function validateName(name: string): ValidationError | null {
  if (!name) {
    return { field: "name", message: "Name is required" };
  }

  if (name.length < 2) {
    return {
      field: "name",
      message: "Name must be at least 2 characters long",
    };
  }

  return null;
}

export function validateLoginForm(
  email: string,
  password: string
): ValidationResult {
  const errors: ValidationError[] = [];

  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);

  if (!password) {
    errors.push({ field: "password", message: "Password is required" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateSignupForm(
  email: string,
  password: string,
  confirmPassword: string,
  name?: string
): ValidationResult {
  const errors: ValidationError[] = [];

  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);

  const passwordError = validatePassword(password);
  if (passwordError) errors.push(passwordError);

  const confirmPasswordError = validateConfirmPassword(
    password,
    confirmPassword
  );
  if (confirmPasswordError) errors.push(confirmPasswordError);

  if (name !== undefined) {
    const nameError = validateName(name);
    if (nameError) errors.push(nameError);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateResetPasswordForm(email: string): ValidationResult {
  const errors: ValidationError[] = [];

  const emailError = validateEmail(email);
  if (emailError) errors.push(emailError);

  return {
    isValid: errors.length === 0,
    errors,
  };
}
