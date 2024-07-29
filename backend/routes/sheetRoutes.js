const express = require('express');
const { updateSheetData, createSheet, updateSheetName, deleteSheet, fetchSheetById } = require('../controllers/sheetControllers');
const { protect } = require('../middlewares/authMiddleware');

const Router = express.Router();

Router.post("/create-sheet", protect, createSheet)
Router.put("/update-sheet-data", protect, updateSheetData)
Router.put("/update-sheet-name", protect, updateSheetName)
Router.delete("/delete-sheet/:id", protect, deleteSheet)
Router.get("/fetch-sheet-by-id/:id", protect, fetchSheetById)

module.exports = Router