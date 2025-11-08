import React from 'react';
import { GoogleIcon, LogoIcon } from '../components/icons/Icons';
import { authService } from '../services/supabaseService';

const LoginPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-sm p-8 space-y-8 bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/30">
                <div className="text-center">
                    <LogoIcon className="h-16 w-16 mx-auto text-violet-400" />
                    <h1 className="mt-4 text-3xl font-bold text-white">Welcome to MindMate</h1>
                    <p className="mt-2 text-gray-400">Your personal companion for mental well-being.</p>
                </div>
                <button
                    onClick={() => authService.signInWithGoogle()}
                    className="w-full flex items-center justify-center py-3 px-4 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                    <GoogleIcon className="h-6 w-6 mr-3" />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
