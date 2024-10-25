import React, { useState } from 'react';
import { Check } from 'lucide-react';

import { FormData, FormErrors } from "./types";
import { EmailInput, validateEmail } from './EmailInput';

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    emailProvider: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters long';
    }

    const emailValidate = validateEmail(formData.email, formData.emailProvider);
    newErrors.email = emailValidate.email;

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const date = new Date(formData.dateOfBirth);
      const today = new Date();
      if (date > today) {
        newErrors.dateOfBirth = 'Date cannot be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-gray-600">Your registration has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200`}
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
        )}
      </div>

      <EmailInput
        email={formData.email}
        emailProvider={formData.emailProvider}
        errors={errors}
        onEmailChange={(s) => {
          setFormData(prev => ({ ...prev, ["email"]: s }));
          if (errors["email" as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, ["email"]: undefined }));
          }
        }}
        onEmailProviderChange={(s) => {
          setFormData(prev => ({ ...prev, ["emailProvider"]: s }));
          if (errors["email" as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, ["email"]: undefined }));
          }
        }}
      />

      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth
        </label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200`}
        />
        {errors.dateOfBirth && (
          <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 font-medium"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;