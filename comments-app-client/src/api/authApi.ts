import axios from 'axios'
import { LoginRequest, SignUpRequest } from '../config/types/requests'
import { AuthResponse } from '../config/types/responses'

const API_BASE_URL = process.env.REACT_APP_API_KEY

export const signUp = async (data: SignUpRequest): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${API_BASE_URL}/auth/register`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error during sign up:', error)
        throw error
    }
}

export const signIn = async (data: LoginRequest): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${API_BASE_URL}/auth/login`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error during sign in:', error)
        throw error
    }
}
