import axios from 'axios';
import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Toast from '../miscellaneous/Toast';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const submit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setMessage("Please fill all details");
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
            const response = await axios.post("http://localhost:8000/api/users/login", { email, password }, config);

            if (response.status === 200) {
                setMessage("Logged in successfully");
                login(response.data);
                navigate('/dashboard')
            } else {
                setMessage("Invalid credentials");
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message || "Invalid credentials");
            } else if (error.request) {
                setMessage("No response from server");
            } else {
                setMessage("Some error occurred");
            }
            console.log(error)
        } finally {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }

        setEmail("");
        setPassword("");
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    return (
        <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor='email'>Email</label>
                <input
                    type="email"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10"
                />
                <button
                    type="button"
                    className={`absolute inset-y-11 right-2 flex items-center justify-center focus:outline-none `}
                    onClick={togglePasswordVisibility}
                >
                    {passwordVisible ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
                </button>
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={submit}
                >
                    Login
                </button>
            </div>
            {
                showToast && (
                    <Toast message={message} />
                )
            }
        </form>
    )
};

export default Login;
