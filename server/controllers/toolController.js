const ToolUsage = require('../models/ToolUsage');

exports.saveUsage = async (req, res) => {
    const { toolName, inputTextLength, resultSummary } = req.body;
    try {
        const usage = new ToolUsage({
            userId: req.user.id,
            toolName,
            inputTextLength,
            resultSummary
        });
        const savedUsage = await usage.save();
        res.json(savedUsage);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getHistory = async (req, res) => {
    try {
        const history = await ToolUsage.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(history);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
