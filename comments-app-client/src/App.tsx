import 'lightbox2/dist/css/lightbox.min.css'
import 'lightbox2/dist/js/lightbox-plus-jquery.min.js'
import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { CommentsProvider } from './context/CommentsContext'
import Home from './pages/Home'

function App() {
    return (
        <AuthProvider>
            <CommentsProvider>
                <Home />
            </CommentsProvider>
        </AuthProvider>
    )
}

export default App
