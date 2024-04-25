const OpenAI = require('openai');


exports.isYesNoQuestion = async (question) => {
    try {
      const history = [];

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
        
    
        const messages = [];

        const model = 'gpt-4';

        for (const [input_text, completion_text] of history) {
          messages.push({ role: 'user', content: input_text });
          messages.push({ role: 'assistant', content: completion_text });
        }
        const prompt = `Your job is to detrmine whether a question can be answered with Yes/No.
        
        You will respond with either "Yes/No question" or "Open ended question"
    
        If the question can be answered with yes or no, you will clasify it as a "Yes/No question".
    
        Unless it is impossible to classify the question as "Yes/No question", do not say "Open Ended".
    
        Please only respond with this and nothing else. 
    
        My question is: ${question}.
        
        `;

        messages.push({ role: 'user', content: prompt });

        const result = await openai.chat.completions.create({model, messages});

        let object = {
          type: result.choices[0].message.content,
        };
        return object;

    } catch (error) {
      console.log(error);
        throw new Error("Unable to parse question");
    }
}

exports.getOptionsForQuestion = async (question) => {

    try {
      const history = [];
      
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const model = 'gpt-4';
        
        const messages = [];
        for (const [input_text, completion_text] of history) {
          messages.push({ role: 'user', content: input_text });
          messages.push({ role: 'assistant', content: completion_text });
        }
        const prompt = `I will provide you with a question, and you will provide me with a list of 4/5 responses to that question. 
        
        If it is a yes/no question, you will simple provide those two responses. However, for questions that need more than yes/no options, please provide 4 short responses with no more than 4/5 words per response ideally. 
        
        Remember, these questions are being asked to someone who has autism, and the options will be displayed as potential responses they could give to the question. Do not give any responses to open-ended questions that have too many responses. For example: "What is your name?", "What is your age?", "What is your nationality?". If you receive a question like that respond with "No options".
    
        My question is: ${question}.
    
        Please provide the responses as an array of texts. For example:
        ["yes","no","maybe","I don't know"];    
        `;
        messages.push({ role: 'user', content: prompt });
        
        const result = await openai.chat.completions.create({model, messages});

        let parse = JSON.parse(result.choices[0].message.content);

        return parse;

    } catch (error) {
        // throw new Error("Cannot parse question");
        console.log(error.message);
    }
}