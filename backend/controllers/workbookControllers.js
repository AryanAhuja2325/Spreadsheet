const asyncHandler = require('express-async-handler');
const Workbook = require('../models/workbookModel');
const Sheet = require('../models/sheetModel');

const createWorkbook = asyncHandler(async (req, res) => {
    const { name, user } = req.body;

    if (!name || !user) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const findWorkbook = await Workbook.findOne({ name: name, user: user });

    if (findWorkbook) {
        res.status(400).json({ message: "Workbook with the same name already created. Please enter another name" });
        return;
    }

    try {
        let newWorkbook = new Workbook({ name, user });
        newWorkbook = await newWorkbook.save();

        const workbook = await Workbook.findOne({ _id: newWorkbook._id }).populate('sheets').exec();

        res.status(200).json(workbook);
    } catch (err) {
        console.log(err)
        res.status(500);
        throw new Error("Server Error");
    }
});

const fetchWorkbooksByUserId = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const workbooks = await Workbook.find({ user: id }).populate('sheets').populate('user');
        res.status(201).json(workbooks)
    } catch (e) {
        console.log(e)
        res.status(500)
        throw new Error("Server Error");
    }
})

const deleteWorkbooks = asyncHandler(async (req, res) => {
    const { id } = req.body;

    try {
        const workbook = await Workbook.findOne({ _id: id });

        if (!workbook) {
            res.status(404);
            throw new Error('Workbook not found');
        }
        const deleteSheets = workbook.sheets.map(async (sheetId) => {
            await Sheet.findByIdAndDelete(sheetId);
        })

        await Promise.all(deleteSheets);

        await Workbook.deleteOne({ _id: id });

        res.status(200).json({ message: "Workbook delted" })

    } catch (e) {
        console.log(e)
        res.status(500)
        throw new Error("Server Error");
    }
})

const fetchWorkbooksById = asyncHandler(async (req, res) => {
    const { id, userId } = req.body;

    if (!id || !userId) {
        res.status(500)
        throw new Error("Please fill all fields");
    }

    try {
        const workbook = await Workbook.findOne({ _id: id, user: userId }).populate('sheets');
        res.status(200).json(workbook)
    } catch (error) {
        res.status(500)
        throw new Error("Server Error");
    }
})


module.exports = { createWorkbook, fetchWorkbooksByUserId, deleteWorkbooks, fetchWorkbooksById }