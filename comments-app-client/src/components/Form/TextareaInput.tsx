import React from 'react'

interface TextareaInputProps {
    label: string
    name: string
    register: any
    validation?: Record<string, any>
    errors?: any
}

const TextareaInput: React.FC<TextareaInputProps> = ({
    label,
    name,
    register,
    validation,
    errors,
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <textarea
            {...register(name, validation)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
        />
        {errors && (
            <span className="text-red-500 text-xs">{errors.message}</span>
        )}
    </div>
)

export default TextareaInput
