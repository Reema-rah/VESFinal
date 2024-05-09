const mongoose = require('mongoose');

const processorSchema = new mongoose.Schema({
    // nativeeditor_status: { type: String},
    duration: { type: Number},
    end_date: { type: String },
    id: { type: Number},
    parent: { type: Number},
    progress: { type: Number},
    start_date: { type: String}, // Reference the 'User' model
    text: { type: String },
});

const processor = mongoose.model('processor', processorSchema); // Capitalized model name

module.exports = processor;