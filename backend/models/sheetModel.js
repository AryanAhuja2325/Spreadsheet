const mongoose = require('mongoose');

const sheetSchema = mongoose.Schema({
    name: { type: String, required: true },
    data: { type: Object, required: true },
    workbook: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Workbook' }
}, { timestamps: true });

const Sheet = mongoose.model("Sheet", sheetSchema);

module.exports = Sheet;