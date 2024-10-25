

export interface FormData {
  name: string;
  email: string;
  emailProvider: string;
  phoneNumberComplete: string;
  countryCode: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  emailProvider?: string;
  phoneNumberComplete?: string;
  coontryCode?: string;
}