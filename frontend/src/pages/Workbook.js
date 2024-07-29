import React, { useContext, useEffect, useState } from 'react';
import ExcelSheet from '../components/workbook/ExcelSheet';
import UserContext from '../context/UserContext';
import axios from 'axios';
import Toast from '../components/miscellaneous/Toast';
import { useNavigate, useParams } from 'react-router-dom';
import CreateSheet from '../components/workbook/CreateSheet';
import UpdateSheet from '../components/workbook/UpdateSheet';

const Workbook = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [data, setData] = useState(null);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [toastVisible, setToastVisible] = useState(false);
    const [activeSheet, setActiveSheet] = useState(null);
    const [addModal, setAddModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [currSheet, setCurrSheet] = useState(null);

    const navigate = useNavigate();

    const fetchWorkbook = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };

            const body = {
                id: id,
                userId: user._id
            };

            const response = await axios.post("http://localhost:8000/api/workbooks/fetch-workbook-by-id", body, config);
            setData(response.data);
            setActiveSheet(response.data.sheets[0]);
        } catch (err) {
            console.log(err);
            setMessage("Some error occurred");
            setType("error");
            setToastVisible(true);
            setTimeout(() => {
                setToastVisible(false);
            }, 3000);
        }
    };

    useEffect(() => {
        fetchWorkbook();
    }, []);

    const handleSheetSelected = (sheet) => {
        setActiveSheet(sheet);
    };

    const handleAdd = () => {
        setAddModal(true);
    };

    const handleUpdate = (id) => {
        setCurrSheet(id);
        setUpdateModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this sheet")) {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    }
                };

                await axios.delete(`http://localhost:8000/api/sheets/delete-sheet/${id}`, config);
                fetchWorkbook();
                setMessage("Sheet deleted successfully");
                setType("success");
                setToastVisible(true);
                setTimeout(() => {
                    setToastVisible(false);
                }, 3000);
            } catch (err) {
                console.log(err);
                setMessage("Failed to delete sheet");
                setType("error");
                setToastVisible(true);
                setTimeout(() => {
                    setToastVisible(false);
                }, 3000);
            }
        } else {
            return
        }
    };

    const goBack = () => {
        navigate(-1)
    }

    const showName = () => {
        if (activeSheet) {
            return activeSheet.name;
        } else {
            return "Loading";
        }
    }

    const showWbName = () => {
        if (data) {
            return data.name;
        } else {
            return "Loading";
        }
    }

    return (
        <div className="relative flex flex-col h-screen">
            <header className='w-screen p-4 bg-gray-800 text-white flex flex-col justify-between'>
                <div className='flex items-center mb-4'>
                    <div className='text-xl font-bold'>{showWbName()}</div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='text-xl font-bold'>{showName()}</div>
                    <nav className='ml-10 space-x-4'>
                        <button className="text-white px-4 py-1 rounded-md bg-gray-700 hover:bg-gray-600" onClick={() => { handleUpdate(activeSheet._id) }}>Edit</button>
                        <button className="text-white px-4 py-1 rounded-md bg-gray-700 hover:bg-gray-600" onClick={() => { handleDelete(activeSheet._id) }}>Delete</button>
                        <button className='bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600' onClick={goBack}>Go Back</button>
                    </nav>
                </div>
            </header>
            <main className="flex-1 overflow-auto" style={{ height: '90vh' }}>
                {activeSheet ?
                    activeSheet.data ? (
                        <ExcelSheet initialData={activeSheet.data} id={activeSheet._id} />
                    ) : (
                        <ExcelSheet initialData={{}} id={activeSheet._id} />
                    )
                    : <div>Loading Sheet</div>
                }
            </main>

            <footer className="bg-gray-800 text-white px-4 py-2 flex relative">
                {data && data.sheets && data.sheets.map((sheet) => (
                    <button
                        key={sheet._id}
                        className="text-gray-800 px-4 py-1 mx-1 rounded-t-md"
                        onClick={() => handleSheetSelected(sheet)}
                        style={{ backgroundColor: sheet._id === activeSheet?._id ? "gray" : "white" }}
                    >
                        {sheet.name}
                    </button>
                ))}
                <button className="bg-white text-gray-800 px-4 py-1 mx-1 rounded-full" onClick={handleAdd}>
                    +
                </button>
            </footer>
            {toastVisible && <Toast message={message} type={type} />}
            <CreateSheet
                showModal={addModal}
                onClose={() => setAddModal(false)}
                atLast={fetchWorkbook}
                wbId={id}
            />
            <UpdateSheet
                showModal={updateModal}
                onClose={() => setUpdateModal(false)}
                atLast={fetchWorkbook}
                wbId={id}
                sheetId={currSheet}
            />
        </div>
    );
};

export default Workbook;
