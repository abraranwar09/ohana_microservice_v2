const dataFromImageService = require('../services/dataFromImageService');

exports.getDataFromImage = async (req, res) => {
    try {
        const data = await dataFromImageService.getDataFromImage(req.query.imageUrl, req.query.caption, req.query.lastMessageOne, req.query.lastMessageTwo, req.query.role);
        res.send(data);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({
            status: 500,
            message: "Internal server error",
        });
    }
};
