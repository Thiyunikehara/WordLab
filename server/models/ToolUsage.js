const mongoose = require('mongoose');

const ToolUsageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    toolName: {
        type: String,
        required: true,
    },
    inputTextLength: {
        type: Number,
    },
    resultSummary: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('ToolUsage', ToolUsageSchema);
