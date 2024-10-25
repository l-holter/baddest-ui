

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
  coontryCode?: string;
}