import React from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from '../../api/authApi'
import { LoginRequest } from '../../config/types/requests'
import { useAuth } from '../../context/AuthContext'
import TextInput from '../Form/TextInput'

const SignInForm: React.FC = () => {
    const { login } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>()

    const onSubmit = async (data: LoginRequest) => {
        try {
            login(data)
        } catch (error) {
            console.error('Failed to sign in:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextInput
                label="Username"
                name="username"
                register={register}
                validation={{
                    required: 'Username is required',
                    pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: 'Only alphanumeric characters allowed',
                    },
                }}
                errors={errors.username}
                errorMessage={errors.username?.message}
            />

            <TextInput
                label="Password"
                name="password"
                register={register}
                validation={{
                    required: 'Password is required',
                }}
                errors={errors.password}
                errorMessage={errors.password?.message}
            />

            <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded w-full"
            >
                Sign In
            </button>
        </form>
    )
}

export default SignInForm
