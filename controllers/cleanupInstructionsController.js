const cleanupInstructionsService = require('../services/cleanupInstructionsService');

exports.getCleanupInstructions = async (req, res) => {
    try {
        const instructions = await cleanupInstructionsService.getCleanupInstructions(req.query.imageUrl, req.query.caption);
        res.send(instructions);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({
            status: 500,
            message: "Internal server error",
        });
    }
};
