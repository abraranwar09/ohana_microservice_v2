const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");



exports.getIngredientsFromImage = async (imageUrl, caption, lastMessageOne, lastMessageTwo, role) => {
  const key = process.env.OPENAI_WEST_KEY;
  const endpoint = process.env.OPENAI_WEST_ENDPOINT;  
  
  try {
    
        const client = new OpenAIClient(
            endpoint,
            new AzureKeyCredential(key));
      
          // const deploymentName = "ohanaai";
          const deploymentName = "ohanaeye";
          const messages = [
            { role: 'system', content: `You will help identify all ingredients, food items and brands in this image.
            
            This information will be used to help determine what recipes can be cooked with these ingredients.
    
            The user has sent a caption with the image: ${caption}.
    
            If an ingredient is obsucured or too unclear to be identified, do not include it in the list. Do not include anything that is not an ingredient/ food item.
            
            Add an appropriate emoji to each ingredient in the list.
    
            You do not need to provide any recipes, only a list of ingredients/food items and any details about them.
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
        throw new Error("Unable to get ingredients from image");
       }
};
