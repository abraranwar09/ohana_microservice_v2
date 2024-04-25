const OpenAI = require('openai');

exports.getCleanupInstructions = async (imageUrl, caption) => {
  
   try {

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const model= 'gpt-4-vision-preview';
  
      const messages = [
        { role: 'system', content: `You will help create steps to clean up the room or space in the image.
        
        This information will be used by another GPT chat to guide the user through the cleaning of their room step by step.

        The user has sent a caption with the image: ${caption}.

        If the caption indicates that this is a room/space they want to clean up, please provide a description of the image and step by step list of instructions for cleanup. If the caption asks for review, please provide a review/description of the room/space in the image.

        For example if the caption says "This is the place I want to clean" respond with an object like the one below:
        {
          "image_description": "This is a table which is very messy",
          "instructions": [
          "Step 1: Take the tissues from your table and put them in the trash",
          "Step 2: Take the books on the table and stack them by size",
          "Step 3: Wipe the dirty table surface with a damp cloth",
          "Final step: Wipe the damp surface with a dry cloth to finish"
        ]
      }

      If the caption says "I am done cleaning my space. Please review" respond with an object like the one below:
        {
          "image_description": "This is a fairly clean room",
          "review": [
          "The bed looks great",
          "May be the pillows could be straighter",
          "Overall very good job"
        ]
      }

        Always label the last step of the cleanup process as "Final step".

        Only return a properly formatted JSON object with the description and an array of instructions/review with nothing before or after.
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
      const parse = JSON.parse(result.choices[0].message.content);


      let object = {
        content: parse,
        image: imageUrl
      };
      return object;
      
   } catch (error) {
    throw new Error("Unable to get cleanup instructions");
    // console.log(error.message);
   }
};
