const questionService = require('../services/questionService');

exports.isYesNoQuestion = async (req, res) => {
    try {
        const response = await questionService.isYesNoQuestion(req.query.question);
        res.send(response);
        
    } catch (error) {
        console.error("An error occured:" + error);
        res.status(500).send({
            status: 500,
            message: "Internal server error"
        });
    }
};

exports.getOptionsForQuestion = async (req, res) => {
  try {
    const response = await questionService.getOptionsForQuestion(req.query.question);
    res.send(response);
    
  } catch (error) {
    console.error("An error occured: " + error);
    res.status(500).send({
        status: 500,
        message: "Internal server error"
    });
  }  
};

