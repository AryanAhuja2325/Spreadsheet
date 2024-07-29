import axios from 'axios';
import React, { useState, useRef, useEffect, useContext } from 'react';
import UserContext from '../../context/UserContext';
import Toast from '../miscellaneous/Toast';

const generateColumnLabels = () => {
    const labels = [];
    for (let i = 0; i < 26; i++) {
        labels.push(String.fromCharCode(65 + i));
    }
    for (let i = 0; i < 26; i++) {
        for (let j = 0; j < 26; j++) {
            labels.push(String.fromCharCode(65 + i) + String.fromCharCode(65 + j));
        }
    }
    return labels;
};

const columnLabels = generateColumnLabels().slice(0, 100);

const parseJsonToData = (json) => {
    const data = Array.from({ length: 100 }, () => Array(100).fill(''));
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const colLabel = key.match(/[A-Z]+/)[0];
            const rowIndex = parseInt(key.match(/\d+/)[0], 10) - 1;
            const colIndex = columnLabels.indexOf(colLabel);
            if (colIndex >= 0 && rowIndex >= 0 && rowIndex < 100 && colIndex < 100) {
                data[rowIndex][colIndex] = json[key];
            }
        }
    }
    return data;
};

const ExcelSheet = ({ initialData, id }) => {
    const { user } = useContext(UserContext)
    const [data, setData] = useState(
        Array.from({ length: 100 }, () => Array(100).fill(''))
    );
    const [editing, setEditing] = useState({ row: null, col: null });
    const [value, setValue] = useState('');
    const [cellWidth, setCellWidth] = useState(0);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");
    const [toastVisible, setToastVisible] = useState(false);

    const cellRefs = useRef({});
    const inputRef = useRef(null);

    const handleDoubleClick = (row, col) => {
        setEditing({ row, col });
        setValue(data[row][col]);
        const cell = cellRefs.current[`${row}-${col}`];
        if (cell) {
            setCellWidth(cell.getBoundingClientRect().width);
        }
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleKeyDown = (e, row, col) => {
        if (e.key === 'Enter' || e.key === 'Tab' || (e.ctrlKey && e.key === "s")) {
            const newData = [...data];
            newData[row][col] = value;
            setData(newData);
            setEditing({ row: null, col: null });
        }
        if (e.key === "Escape") {
            handleBlur(row, col)
        }
    };

    const generateFunc = (str) => {
        let string = str.split("=")
        string = string[1].split("(")
        const op = string[0];
        const vals = string[1].split(")")[0].split(",").map(parseFloat);

        let result;

        switch (op) {
            case 'SUM': {
                result = vals.reduce((sum, val) => sum + val, 0);
                break;
            }
            case 'MUL': {
                result = vals.reduce((product, val) => product * val, 1);
                break;
            }
            case 'AVG': {
                result = vals.reduce((sum, val) => sum + val, 0) / vals.length;
                break;
            }
            case 'MIN': {
                result = Math.min(...vals);
                break;
            }
            case 'MAX': {
                result = Math.max(...vals);
                break;
            }
            default:
                return str;
        }

        return isNaN(result) ? "!UNDEFINED" : result;
    }

    const handleKeyDownOnPage = async (e) => {
        if (e.ctrlKey && e.key === "s") {
            e.preventDefault();
            const data = generateJSON();
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };
            try {
                await axios.put("http://localhost:8000/api/sheets/update-sheet-data", { newData: data, id: id }, config);
                showToast("Saved data successfully", "success");
            } catch (error) {
                showToast("Error saving data", "error");
            }
        }
    }

    const handleBlur = (row, col) => {
        const newData = [...data];
        newData[row][col] = value;
        setData(newData);
        setEditing({ row: null, col: null });
    };

    const generateJSON = () => {
        const jsonData = {};
        data.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellLabel = `${columnLabels[colIndex]}${rowIndex + 1}`;
                jsonData[cellLabel] = cell;
            });
        });
        return jsonData;
    };

    const showToast = (message, type) => {
        setToastMessage(message);
        setToastType(type);
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
        }, 3000);
    };

    useEffect(() => {
        if (initialData) {
            setData(parseJsonToData(initialData))
        }
    }, [initialData])

    const renderCell = (str) => {
        if (str.startsWith("=")) {
            return (generateFunc(str))
        } else {
            return str;
        }
    }

    return (
        <div className="excel-sheet-container bg-white w-screen h-90%" onKeyDown={handleKeyDownOnPage} style={{ height: "calc(100%-50px)" }}>
            {/* <input
                className='w-screen'
                placeholder='Formula Bar'
            /> */}
            <table className="table-auto border-collapse border border-gray-300 min-w-max">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 bg-gray-400"></th>
                        {columnLabels.map((label, colIndex) => (
                            <th key={colIndex} className="border border-gray-300 px-4 py-2 bg-gray-400">
                                {label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="border border-gray-300 px-4 py-2 font-bold bg-gray-400">{rowIndex + 1}</td>
                            {row.map((cell, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`border px-4 py-2 ${editing.row === rowIndex && editing.col === colIndex ? 'border-blue-500' : 'border-gray-300'}`}
                                    style={{ minWidth: '80px', maxWidth: '300px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                                    onClick={() => handleDoubleClick(rowIndex, colIndex)}
                                    ref={(el) => (cellRefs.current[`${rowIndex}-${colIndex}`] = el)}
                                >
                                    {editing.row === rowIndex && editing.col === colIndex ? (
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={handleChange}
                                            onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                                            onBlur={() => handleBlur(rowIndex, colIndex)}
                                            ref={inputRef}
                                            style={{ width: `${cellWidth}px`, border: 'none', background: 'transparent', outline: 'none' }}
                                        />
                                    ) : (
                                        <div style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {renderCell(cell)}
                                        </div>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {toastVisible && <Toast message={toastMessage} type={toastType} />}
            <style jsx>{`
                .excel-sheet-container {
                    overflow-x: auto;
                    overflow-y: auto;
                }
                .excel-sheet-container::-webkit-scrollbar {
                    width: 12px;
                    height: 12px;
                    position: absolute;
                }
                .excel-sheet-container::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                .excel-sheet-container::-webkit-scrollbar-thumb {
                    background: #888;
                }
                .excel-sheet-container::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
                .excel-sheet-container {
                    -ms-overflow-style: auto; /* IE and Edge */
                    scrollbar-width: auto; /* Firefox */
                    scrollbar-color: #888 #f1f1f1; /* Firefox */
                }
            `}</style>
        </div>
    );
};

export default ExcelSheet;
