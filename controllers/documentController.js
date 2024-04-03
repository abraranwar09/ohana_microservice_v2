const documentService = require('../services/documentService');

exports.summarize = async (req, res) => {
    try {
        const summary = await documentService.summarize(req.query.documentID);
        res.send(summary);
        
    } catch (error) {
        console.error('An error occured', error);
        res.status(500).send({
            status: 500,
            message: "Internal server error",
        });
    }
}