// CustomDropdown.tsx
import React, { useState } from "react";

type CustomDropdownProps = {
    options: string[];
    selectedValue: string;
    onSelect: (name: string, value: string) => void;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    options,
    selectedValue,
    onSelect,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (name: string, value: string) => {
        onSelect(name, value);
        setIsOpen(false);
    };

    return (
        <div>
            <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                Name
            </label>
            <input
                type="text"
                value={selectedValue}
                readOnly // Prevents typing
                onClick={toggleDropdown}
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200`}
            />
            {isOpen && (
                <ul className="">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect("name", option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;
