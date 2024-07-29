const mongoose = require('mongoose');
const Sheet = require('./sheetModel');

const workbookSchema = mongoose.Schema({
    name: { type: String, required: true, default: "New Workbook" },
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    sheets: [{ type: mongoose.Types.ObjectId, ref: 'Sheet' }],
    sheetCount: { type: Number, default: 3 }
}, { timestamps: true });

workbookSchema.pre('save', async function (next) {
    if (this.isNew) {
        try {
            const defaultSheets = await Promise.all([
                new Sheet({ name: 'Sheet1', data: {}, workbook: this._id }).save(),
                new Sheet({ name: 'Sheet2', data: {}, workbook: this._id }).save(),
                new Sheet({ name: 'Sheet3', data: {}, workbook: this._id }).save(),
            ]);
            this.sheets = defaultSheets.map(sheet => sheet._id);
        } catch (err) {
            return next(err);
        }
    }
    next();
})

const Workbook = mongoose.model('Workbook', workbookSchema);
module.exports = Workbook;