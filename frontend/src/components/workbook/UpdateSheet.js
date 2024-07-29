import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import Toast from '../miscellaneous/Toast';

const UpdateSheet = ({ showModal, onClose, atLast, wbId, sheetId }) => {
    const { user } = useContext(UserContext);
    const [sheet, setSheet] = useState({});
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("fail");
    const [showToast, setShowToast] = useState(false);

    const fetchSheet = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const response = await axios.get(`http://localhost:8000/api/sheets/fetch-sheet-by-id/${sheetId}`, config);
            setSheet(response.data);
            setTitle(response.data.name);
        } catch (err) {
            setMessage("Some error occurred");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
    };

    useEffect(() => {
        fetchSheet();
    }, [sheetId]);

    const submit = async () => {
        if (!title) {
            setMessage("Please enter the title");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const data = {
                id: sheetId,
                name: title,
                wbId: wbId
            };

            const response = await axios.put("http://localhost:8000/api/sheets/update-sheet-name", data, config);
            if (response.status === 200) {
                setMessage("Sheet Updated!");
                setType("success");
            } else {
                setMessage("Some error occurred");
            }
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
            onClose();
        } catch (e) {
            console.log(e);
            setMessage("Some error occurred");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } finally {
            atLast();
        }
    };

    const checkVisibility = () => {
        return title === sheet.name;
    };

    return (
        showModal && (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden w-96">
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="text-xl font-semibold text-gray-900">Update Sheet</h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            onClick={onClose}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-600">
                            Update the title of the sheet:
                        </p>
                        <input
                            type="text"
                            placeholder="Enter the title"
                            className="my-4 p-2 w-full border rounded-md bg-gray-100"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <button
                            className={`my-4 w-full px-4 py-2 text-white rounded hover:bg-blue-700 focus:outline-none ${checkVisibility() ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'}`}
                            onClick={submit}
                            disabled={checkVisibility()}
                        >
                            Update
                        </button>
                    </div>
                </div>
                {showToast && <Toast message={message} type={type} />}
            </div>
        )
    );
};

export default UpdateSheet;
