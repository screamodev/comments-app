import React from 'react';

interface TextInputProps {
    label: string;
    name: string;
    register: any;
    validation?: Record<string, any>;
    errors?: any;
    errorMessage?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, name, register, validation, errors, errorMessage }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            {...register(name, validation)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
        />
        {errors && <span className="text-red-500 text-xs">{errorMessage}</span>}
    </div>
);

export default TextInput;
