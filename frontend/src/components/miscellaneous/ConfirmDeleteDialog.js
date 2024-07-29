import React from 'react';

const ConfirmDeleteDialog = ({ show, onClose, onConfirm, workbookName }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                <p className="mb-4">Are you sure you want to delete the workbook "{workbookName}"?</p>
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                    <button
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteDialog;
