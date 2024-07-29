import React, { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';
import Toast from '../miscellaneous/Toast';
import axios from 'axios';

const Profile = () => {
    const { user, logout } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [currpassword, setCurrpassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [toast, setToast] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("fail")

    const handleUpdateProfile = async () => {
        try {
            const data = {
                id: user._id,
                name: name,
                email: email
            };
            const response = await axios.post("http://localhost:8000/api/users/update-profile", data);
            console.log(response.status)
            if (response.status === 200) {
                setMessage("Profile updated successfully");
                setType("success");
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                }, 3000);
                setTimeout(() => {
                    logout();
                }, 3000)
            }
        } catch (err) {
            setMessage("Failed to update profile");
            setType("fail");
            setToast(true);
            setTimeout(() => {
                setToast(false);
            }, 3000);
        }

    };

    const isDisabled = () => {
        return name === user.name && email === user.email;
    }

    const toggleModal = () => {
        setShowModal(!showModal);
        setCurrpassword("")
        setNewPassword("")
        setRepassword("")
    };

    const changePassword = async () => {
        if (!newPassword || !currpassword || !repassword) {
            setToast(true);
            setMessage("Please fill all fields")
            setTimeout(() => {
                setToast(false)
            }, 3000)
            return
        }

        if (newPassword !== repassword) {
            setToast(true);
            setMessage("Password do not match")
            setTimeout(() => {
                setToast(false)
            }, 3000)
            return
        }

        try {
            const data = {
                id: user._id,
                newPassword: newPassword,
                password: currpassword
            }
            const response = await axios.post("http://localhost:8000/api/users/change-password", data);
            if (response.status == 200) {
                setMessage("Password changed");
                setToast(true);
                setTimeout(() => {
                    setToast(false)
                }, 3000)
                setType("success");
                setTimeout(() => {
                    toggleModal()
                }, 1000)
                return
            }
        } catch (err) {
            if (err.status == 401) {
                setMessage("Enter correct password");
                setToast(true);
                setTimeout(() => {
                    setToast(false)
                }, 3000)
                return
            }
        }

    }

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-md w-96 relative z-10">
                <h2 className="text-4xl font-bold mb-6 text-center">Profile</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        className="my-1 p-2 w-full border rounded-md bg-gray-100"
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        className="my-1 p-2 w-full border rounded-md bg-gray-100"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={handleUpdateProfile}
                        className={`px-4 py-2 rounded hover:bg-blue-700 focus:outline-none ${isDisabled() ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                        disabled={isDisabled()}
                    >
                        Update Profile
                    </button>
                    <button
                        onClick={toggleModal}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
                    >
                        Change Password
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-96">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-xl font-semibold text-gray-900">Change Password</h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                onClick={toggleModal}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-600">
                                Enter your current password below:
                            </p>
                            <input
                                type="password"
                                placeholder="Current Password"
                                className="my-4 p-2 w-full border rounded-md bg-gray-100"
                                value={currpassword}
                                onChange={e => setCurrpassword(e.target.value)}

                            />

                            <p className="text-gray-600">
                                Enter your new password below:
                            </p>
                            <input
                                type="password"
                                placeholder="New Password"
                                className="my-4 p-2 w-full border rounded-md bg-gray-100"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                            />

                            <p className="text-gray-600">
                                Re-Enter your new password below:
                            </p>
                            <input
                                type="password"
                                placeholder="Re-enter new Password"
                                className="my-4 p-2 w-full border rounded-md bg-gray-100"
                                value={repassword}
                                onChange={e => setRepassword(e.target.value)}
                            />
                            <button
                                onClick={changePassword}
                                className="my-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {
                toast && (
                    <Toast message={message} type={type} />
                )
            }
        </div>
    );
};

export default Profile;
