import React from 'react'

interface AuthButtonsProps {
    isSignIn: boolean
    toggleForm: () => void
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isSignIn, toggleForm }) => (
    <div className="flex justify-center space-x-4 mb-4">
        <button
            onClick={toggleForm}
            className={`py-2 px-4 font-medium rounded-md ${
                isSignIn ? 'bg-indigo-600 text-white' : 'bg-gray-300'
            }`}
        >
            Sign In
        </button>
        <button
            onClick={toggleForm}
            className={`py-2 px-4 font-medium rounded-md ${
                !isSignIn ? 'bg-indigo-600 text-white' : 'bg-gray-300'
            }`}
        >
            Sign Up
        </button>
    </div>
)

export default AuthButtons
