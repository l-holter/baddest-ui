import { FormErrors } from "./types";





const validateEmail = (email: string) => {
    const newErrors: FormErrors = {};

    if (email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    return newErrors;
}