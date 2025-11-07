import React, { useState } from 'react';
import { LogoIcon, GoogleIcon } from '../components/icons/Icons';
import { supabase } from '../services/supabaseClient';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.href,
        }
    });
    if (error) {
      setError('Login failed. Please try again.');
      console.error('Google login error:', error);
      setLoading(false);
    }
    // On success, Supabase handles the redirect, so no need to set loading to false.
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-center p-4">
      <div className="flex flex-col items-center mb-8 animate-fade-in-down">
        <LogoIcon className="h-24 w-24 text-violet-400 mb-4" />
        <h1 className="text-5xl font-bold text-white">MindMate</h1>
        <p className="text-xl text-gray-400 mt-2">Your Emotion-Aware Student Companion</p>
      </div>
      <button
        onClick={handleLogin}
        disabled={loading}
        className="px-8 py-4 bg-white text-gray-800 font-bold rounded-lg text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gray-500/20 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
      >
        <GoogleIcon className="h-6 w-6" />
        <span>{loading ? 'Redirecting...' : 'Login with Google'}</span>
      </button>
      {error && <p className="text-red-400 mt-4">{error}</p>}
       <p className="text-gray-500 mt-8 max-w-md">
        Your data is securely stored and linked to your Google account.
      </p>
    </div>
  );
};

export default LoginPage;