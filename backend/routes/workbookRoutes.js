const express = require('express');
const { createWorkbook, fetchWorkbooksByUserId, deleteWorkbooks, fetchWorkbooksById } = require('../controllers/workbookControllers');
const { protect } = require('../middlewares/authMiddleware');

const Router = express.Router();

Router.post('/create-workbook', protect, createWorkbook);
Router.get('/fetch-workbooks/:id', protect, fetchWorkbooksByUserId);
Router.delete('/delete-workbook', protect, deleteWorkbooks);
Router.post('/fetch-workbook-by-id', protect, fetchWorkbooksById)

module.exports = Router;