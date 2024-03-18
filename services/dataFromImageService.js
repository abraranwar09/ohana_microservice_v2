const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");




exports.getDataFromImage = async (imageUrl, caption, lastMessageOne, lastMessageTwo, role) => {
  const key = process.env.OPENAI_WEST_KEY;
  const endpoint = process.env.OPENAI_WEST_ENDPOINT;  
  
  try {
    
        const client = new OpenAIClient(
            endpoint,
            new AzureKeyCredential(key));
      
          // const deploymentName = "ohanaai";
          const deploymentName = "ohanaeye";
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
    
    
          const result = await client.getChatCompletions(deploymentName, messages, { maxTokens: 1000 });
          return result.choices[0].message?.content;
          
       } catch (error) {
        // throw new Error("Unable to get data from image");
        console.log('Error: ' + error.message);
       }
};
