import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthContext'
import TextInput from '../Form/TextInput'

interface SignUpFormData {
    username: string
    password: string
    email: string
    homePage?: string
}

const SignUpForm: React.FC = () => {
    const { register: authRegister } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>()

    const onSubmit = async (data: SignUpFormData) => {
        try {
            authRegister(data)
        } catch (error) {
            console.error('Failed to sign up:', error)
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

            <TextInput
                label="Email"
                name="email"
                register={register}
                validation={{
                    required: 'Email is required',
                    pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: 'Enter a valid email',
                    },
                }}
                errors={errors.email}
                errorMessage={errors.email?.message}
            />

            <TextInput
                label="Home Page"
                name="homePage"
                register={register}
                validation={{
                    pattern: {
                        value: /^https?:\/\/[^\s$.?#].[^\s]*$/,
                        message: 'Enter a valid URL',
                    },
                }}
                errors={errors.homePage}
                errorMessage={errors.homePage?.message}
            />

            <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded w-full"
            >
                Sign Up
            </button>
        </form>
    )
}

export default SignUpForm
