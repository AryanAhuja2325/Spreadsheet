import React, { useState } from 'react';
import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';

const Home = () => {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <div className=" flex flex-col items-center bg-opacity-75 p-4 min-w-80">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-black via-gray-700 to-gray-800 inline-block text-transparent bg-clip-text">SpreadSheet</h1>
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                <div className="flex justify-around mb-4">
                    <button
                        className={`py-2 px-4 ${activeTab === 'login' ? 'border-b-2 border-blue-500' : ''}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === 'signup' ? 'border-b-2 border-blue-500' : ''}`}
                        onClick={() => setActiveTab('signup')}
                    >
                        Signup
                    </button>
                </div>
                <div>
                    {activeTab === 'login' ? (
                        <div>
                            <Login />
                        </div>
                    ) : (
                        <div>
                            <Signup />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
