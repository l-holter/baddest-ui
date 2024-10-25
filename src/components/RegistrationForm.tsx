import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface FormData {
  fullName: string;
  email: string;
  phoneNumberComplete: string;
  countryCode: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phoneNumberComplete?: string;
  countryCode?: string;
}

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumberComplete: "50505050",
    countryCode: ''
  });
  const [isCountryCodeDialogOpen, setIsCountryCodeDialogOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const [phoneNumber1, setPhoneNumber1] = useState(50);
  const [phoneNumber2, setPhoneNumber2] = useState(50);
  const [phoneNumber3, setPhoneNumber3] = useState(50);
  const [phoneNumber4, setPhoneNumber4] = useState(50);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters long';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.countryCode.trim()) {
      newErrors.countryCode = 'Country code is required';
    } else if (formData.countryCode.length != 2) {
      newErrors.countryCode = 'Code must be at exactly 2 characters long';
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

  const handleCountryCodeClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const randomElement = (array: Array<string>) => array[Math.floor(Math.random() * array.length)];
    const countries = ["NO", "SE", "DK", "FI", "IS", "FO", "GB", "FR", "DE"];
    const images = Array.from(Array(9).keys()).map(i => `images/${randomElement(countries)}-${i+1}.png`);
    console.log("images", images);
    setImages(images);
    setIsCountryCodeDialogOpen(true);
  }

  const handleImageClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const selectedCountryCode = e.target.src.split('/').slice(-1)[0].split('-')[0];
    console.log("selected country", selectedCountryCode)
    setIsCountryCodeDialogOpen(false);
    setFormData({
      ...formData,
      countryCode: selectedCountryCode
    })
  }
  const handleSliderChange = (index: number, value: number) => {
    switch (index) {
      case 1:
        setPhoneNumber1(value);
        break;
      case 2:
        setPhoneNumber2(value);
        break;
      case 3:
        setPhoneNumber3(value);
        break;
      case 4:
        setPhoneNumber4(value);
        break;
      default:
        break;
    }
  
    const formattedPhoneNumber1 = phoneNumber1.toString().padStart(2, '0');
    const formattedPhoneNumber2 = phoneNumber2.toString().padStart(2, '0');
    const formattedPhoneNumber3 = phoneNumber3.toString().padStart(2, '0');
    const formattedPhoneNumber4 = phoneNumber4.toString().padStart(2, '0');
  
    const completeNumber = `${formattedPhoneNumber1}${formattedPhoneNumber2}${formattedPhoneNumber3}${formattedPhoneNumber4}`;
    setFormData((prevData) => ({
      ...prevData,
      phoneNumberComplete: completeNumber,
    }));
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
    <>
    <dialog open={isCountryCodeDialogOpen} style={{zIndex:1000}}>
        <div>
          Click your country
          <div>
            <div className='grid grid-cols-3 gap-3'>
              {images.map(image => (
                <img width={250} height={250} src={image} onClick={handleImageClick} />
              ))}
            </div>
          </div>
        </div>
      </dialog>
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

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200`}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>

        <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700 mb-1">
          Country
        </label>
        <input
          type="text"
          id="countryCode"
          name="countryCode"
          value={formData.countryCode}
          onChange={handleChange}
          onClick={handleCountryCodeClick}
          className={`w-full px-4 py-2 rounded-lg border ${errors.countryCode ? 'border-red-500' : 'border-gray-300'
            } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200`}
        />
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Phone number
        </label>
        <div>
          <Slider
            min={0}
            max={99}
            defaultValue={50}
            step={1}
            onChange={(value) => handleSliderChange(1, value)}
            onChangeComplete={(value) => handleSliderChange(1, value)}
            id="phoneNumber1"
            value={phoneNumber1}
          />
          <p className="text-center">{phoneNumber1.toString().padStart(2, '0')}</p>
          <p className="text-center">+</p>
          <Slider
            min={0}
            max={99}
            defaultValue={50}
            step={1}
            onChange={(value) => handleSliderChange(2, value)}
            onChangeComplete={(value) => handleSliderChange(2, value)}
            id="phoneNumber2"
            value={phoneNumber2}
          />
          <p className="text-center">{phoneNumber2.toString().padStart(2, '0')}</p>
          <p className="text-center">+</p>
          <Slider
            min={0}
            max={99}
            defaultValue={50}
            step={1}
            onChange={(value) => handleSliderChange(3, value)}
            onChangeComplete={(value) => handleSliderChange(3, value)}
            id="phoneNumber3"
            value={phoneNumber3}
          />
          <p className="text-center">{phoneNumber3.toString().padStart(2, '0')}</p>
          <p className="text-center">+</p>
          <Slider
            min={0}
            max={99}
            defaultValue={50}
            step={1}
            onChange={(value) => handleSliderChange(4, value)}
            onChangeComplete={(value) => handleSliderChange(4, value)}
            id="phoneNumber4"
            value={phoneNumber4}
          />
          <p className="text-center">{phoneNumber4.toString().padStart(2, '0')}</p>
          <p className="text-center">=</p>
          <p className="text-center">{formData.phoneNumberComplete}</p>
        </div>
        
        {errors.phoneNumberComplete && (
          <p className="mt-1 text-sm text-red-600">{errors.phoneNumberComplete}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 font-medium"
      >
        Register
      </button>
    </form>
    </>
  );
};

export default RegistrationForm;