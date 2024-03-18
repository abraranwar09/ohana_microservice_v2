const formDataService = require('../services/formDataService');

exports.getFormData = async (req, res) => {
    try {
        const formData = await formDataService.getFormData(req.query.imageUrl);
        res.send(formData);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({
            status: 500,
            message: "Internal server error",
        });
    }
};
