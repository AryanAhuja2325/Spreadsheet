const Sheet = require('../models/sheetModel');
const Workbook = require('../models/workbookModel');
const asyncHandler = require('express-async-handler');

const createSheet = asyncHandler(async (req, res) => {
    const { name, wbId } = req.body;
    if (!name || !wbId) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const findSheet = await Sheet.findOne({ name: name, workbook: wbId });

    if (findSheet) {
        res.status(400)
        res.json({ message: "Sheet with the same name already found" });
    }

    try {
        let newSheet = new Sheet({ name: name, workbook: wbId, data: {} });
        newSheet.save();

        const workbook = await Workbook.findByIdAndUpdate(
            wbId,
            { $push: { sheets: newSheet._id }, $inc: { sheetCount: 1 } },
            { new: true }
        )
        res.status(200).json(newSheet)
    } catch (error) {
        res.status(400);
        throw new Error("Some error occurred");
    }
})

const updateSheetData = asyncHandler(async (req, res) => {
    const { newData, id } = req.body;

    if (!newData || !id) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    try {
        const updatedSheet = await Sheet.findByIdAndUpdate(id, { data: newData }, { new: true });
        res.status(200).json(updatedSheet);
    } catch (error) {
        res.status(400);
        throw new Error("Some error occurred");
    }
})

const updateSheetName = asyncHandler(async (req, res) => {
    const { id, name, wbId } = req.body;

    if (!id || !name || !wbId) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const findSheet = await Sheet.findOne({ name: name, workbook: wbId });

    if (findSheet) {
        res.status(400)
        res.json({ message: "Sheet with the same name already found" });
    }

    try {
        const updatedSheet = await Sheet.findByIdAndUpdate(id, { name: name }, { new: true })
        res.status(200).json(updatedSheet)
    } catch (error) {
        console.log(error)
        res.status(400);
        throw new Error("Some error occurred");
    }
})

const deleteSheet = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400);
        throw new Error("Some error occurred");
    }

    try {
        let sheet = await Sheet.findOne({ _id: id })

        const workbook = await Workbook.findByIdAndUpdate(
            sheet.workbook,
            { $pull: { sheets: sheet._id }, $inc: { sheetCount: -1 } },
            { new: true }
        )
        await Sheet.deleteOne({ _id: id });
        res.status(200).json({ message: "Sheet Deleted Successfully" })
    } catch (error) {
        console.log(error)
        res.status(400);
        throw new Error("Some error occurred");
    }
})

const fetchSheetById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400);
        throw new Error("Some error occurred");
    }

    try {
        const sheet = await Sheet.findById(id);
        res.status(200).json(sheet);
    } catch (error) {
        res.status(400);
        throw new Error("Some error occurred");
    }
})

module.exports = { updateSheetData, createSheet, updateSheetName, deleteSheet, fetchSheetById }