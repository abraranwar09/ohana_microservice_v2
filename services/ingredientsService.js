const OpenAI = require('openai');


exports.getIngredientsFromImage = async (imageUrl, caption, lastMessageOne, lastMessageTwo, role) => {
  
  
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const model = 'gpt-4-vision-preview';
    
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
    
          const result = await openai.chat.completions.create({model, messages});

          let object = {
            description: result.choices[0].message.content,
            image: imageUrl
          };
          return object;
          
       } catch (error) {
        throw new Error("Unable to get ingredients from image");
       }
};
