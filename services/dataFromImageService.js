const OpenAI = require('openai');


exports.getDataFromImage = async (imageUrl, caption, lastMessageOne, lastMessageTwo, role) => { 
  try {
    
          const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
          });

          const model = 'gpt-4-vision-preview';
  
              const messages = [
            { role: 'system', content: `My prompt is: ${caption}. I am already in a chat with a GPT model. These are our last two messages for context:
              1. ${lastMessageOne}
              2. ${lastMessageTwo}.
    
              Your role in this context is: ${role}.
            ` },
            {
              role: 'user',
              content: [
                {
                  type: "image_url",
                  image_url: {
                    "url": `${imageUrl}`,
                    "detail": "high",
                  },
                },
              ],
              },
          ];
    
    
          const result = await openai.chat.completions.create({model, messages});

          let object = {
            description: result.choices[0].message.content,
            image: imageUrl
          };
          return object;
          
       } catch (error) {
        // throw new Error("Unable to get data from image");
        console.log('Error: ' + error.message);
       }
};
