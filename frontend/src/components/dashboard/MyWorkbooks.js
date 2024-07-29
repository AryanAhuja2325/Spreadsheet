import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import Toast from '../miscellaneous/Toast';
import { CiCirclePlus } from "react-icons/ci";
import { IoTrashBin } from "react-icons/io5";
import CreateWorkbook from '../workbook/CreateWorkbook';
import ConfirmDeleteDialog from '../miscellaneous/ConfirmDeleteDialog';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';

const MyWorkbooks = () => {
    const [data, setData] = useState([]);
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [workbookToDelete, setWorkbookToDelete] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const response = await axios.get(`http://localhost:8000/api/workbooks/fetch-workbooks/${user._id}`, config);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            setMessage("Some error occurred");
            setType("error");
            setShowToast(true);
            setLoading(false);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    const openWb = (dt) => {
        navigate(`/workbook/${dt._id}`)
    };

    const handleAdd = () => {
        setShowModal(!showModal);
    };

    const handleDelete = (id) => {
        setWorkbookToDelete(id);
        setShowDeleteDialog(true);
    };

    const confirmDelete = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                data: {
                    id: workbookToDelete
                }
            };
            const response = await axios.delete(`http://localhost:8000/api/workbooks/delete-workbook`, config);
            if (response.status === 200) {
                setMessage("Deleted Successfully");
                setType("success");
                setShowDeleteDialog(false);
                fetchData();
            } else {
                setMessage("Some error occurred");
                setType("error");
            }
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (error) {
            setMessage("Some error occurred");
            setType("error");
            setShowToast(true);
            setLoading(false);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
    };

    const sortedData = [...data].sort((a, b) => {
        return new Date(b.updated_on) - new Date(a.updated_on);
    });

    return (
        <div className=" px-4 w-screen h-screen py-10">
            <div className="flex justify-between items-center mb-4 px-1">
                <h1 className="text-2xl font-bold text-gray-800">My Workbooks</h1>
                {sortedData.length > 0 && (
                    <button
                        className="text-xl flex items-center justify-center text-gray-800 rounded-full bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 p-2"
                        onClick={handleAdd}
                    >
                        <CiCirclePlus className="h-6 w-6" />
                    </button>
                )}
            </div>
            {loading ? (
                <div className="text-center mt-8">
                    <p className="text-gray-600">Loading...</p>
                </div>
            ) : sortedData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-1/2">
                    {sortedData.map((dt, index) => (
                        <div
                            key={index}
                            className="border rounded-lg p-4 bg-white shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => openWb(dt)}
                            data-tooltip-id={`tooltip-${index}`}
                        >
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-xl font-semibold text-gray-800">{dt.name}</h2>
                                <button
                                    className="text-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 rounded-full px-4 py-2 ml-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(dt._id);
                                    }}
                                >
                                    <IoTrashBin />
                                </button>
                            </div>
                            <p className="text-gray-600 mb-2">Created on: {new Date(dt.createdAt).toLocaleDateString()}</p>
                            <p className="text-gray-600">Updated on: {new Date(dt.updatedAt).toLocaleDateString()}</p>
                            <ReactTooltip id={`tooltip-${index}`} place="bottom" effect="solid" content={`Author: ${dt.user.name}`} variant='light' />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">No workbooks found</h2>
                    <button
                        className="text-lg text-gray-800 rounded-full bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 p-2"
                        onClick={handleAdd}
                    >
                        Get Started
                    </button>
                </div>
            )}
            {showToast && <Toast message={message} type={type} />}
            <CreateWorkbook
                showModal={showModal}
                onClose={() => {
                    setShowModal(!showModal);
                }}
                atLast={fetchData}
            />
            <ConfirmDeleteDialog
                show={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={confirmDelete}
                workbookName={data.find(item => item._id === workbookToDelete)?.name || ""}
            />
        </div>
    );
};

export default MyWorkbooks;
