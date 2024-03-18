const ingredientsService = require('../services/ingredientsService');

exports.getIngredientsFromImage = async (req, res) => {
    try {
        const ingredients = await ingredientsService.getIngredientsFromImage(req.query.imageUrl, req.query.caption, req.query.lastMessageOne, req.query.lastMessageTwo, req.query.role);
        res.send(ingredients);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send({
            status: 500,
            message: error.message,
        });
    }
};
