import React, { useState } from 'react'
import AuthButtons from './AuthButtons'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

const AuthForm: React.FC = () => {
    const [isSignIn, setIsSignIn] = useState(true)

    const toggleForm = () => setIsSignIn(!isSignIn)

    return (
        <div className="lg:w-1/3 border border-gray-300 rounded-md bg-white p-4 shadow-md">
            <h2 className="text-lg text-center font-medium mb-4">
                You have to sign in to add a comment.
            </h2>
            <AuthButtons isSignIn={isSignIn} toggleForm={toggleForm} />
            {isSignIn ? <SignInForm /> : <SignUpForm />}
        </div>
    )
}

export default AuthForm
