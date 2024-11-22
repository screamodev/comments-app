import axios from 'axios'
import React from 'react'

const TokenButton: React.FC = () => {
    const handleTokenRequest = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_KEY}/auth/login`
            )
            const newToken = response.data.accessToken

            if (!newToken) {
                console.error('Failed to fetch token.')
                return
            }

            localStorage.setItem('token', newToken)
            alert('Token successfully added.')
        } catch (error) {
            console.error('Failed to fetch token:', error)
        }
    }

    return (
        <div className="flex justify-center">
            <button
                className="mt-4 py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
                onClick={handleTokenRequest}
            >
                Get Token
            </button>
        </div>
    )
}

export default TokenButton
