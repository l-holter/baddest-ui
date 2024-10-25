

export interface FormData {
  fullName: string;
  email: string;
  emailProvider: string;
  dateOfBirth: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  dateOfBirth?: string;
}