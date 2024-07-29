import axios from 'axios';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Toast from '../miscellaneous/Toast';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
            setMessage("Please fill all the fields");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords dont match");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const response = await axios.post("http://localhost:8000/api/users/register-user", { name, email, password }, config);

            if (response.status = 200) {
                setMessage("User created successfully");
            }
        } catch (e) {
            setMessage("Some error occured");
        } finally {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }

        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor='name'>Name</label>
                <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id='name'
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor='email'>Email</label>
                <input
                    type="email"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id='email'
                />
            </div>
            <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10"
                />
                <button
                    type="button"
                    className={`absolute inset-y-10 right-2 flex items-center justify-center focus:outline-none`}
                    onClick={togglePasswordVisibility}
                >
                    {passwordVisible ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
                </button>
            </div>
            <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10"
                />
                <button
                    type="button"
                    className={`absolute inset-y-10 right-2 flex items-center justify-center focus:outline-none`}
                    onClick={toggleConfirmPasswordVisibility}
                >
                    {confirmPasswordVisible ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
                </button>
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={submit}
                >
                    Signup
                </button>
            </div>
            {
                showToast && (<Toast message={message} />)
            }
        </form>
    );
};

export default Signup;
