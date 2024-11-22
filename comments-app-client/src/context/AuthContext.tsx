import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
import { signIn, signUp } from '../api/authApi'
import { LoginRequest, SignUpRequest } from '../config/types/requests'

interface AuthContextType {
    token: string | null
    isAuthenticated: boolean
    register: (data: SignUpRequest) => void
    login: (data: LoginRequest) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
            setToken(storedToken)
        }
    }, [])

    const login = async (data: LoginRequest) => {
        const response = await signIn(data)
        localStorage.setItem('token', response.token)
        setToken(response.token)
    }

    const register = async (data: SignUpRequest) => {
        const response = await signUp(data)
        localStorage.setItem('token', response.token)
        setToken(response.token)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
    }

    const isAuthenticated = !!token

    return (
        <AuthContext.Provider
            value={{ token, isAuthenticated, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
