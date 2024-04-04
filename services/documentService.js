const { google } = require('googleapis');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.YJV_API_KEY,
});

const docs = google.docs('v1');
const auth = new google.auth.GoogleAuth({
    keyFile: './tranquil-apogee-394711-0c31a0f3570d.json',
    scopes: [
        'https://www.googleapis.com/auth/documents',
        'https://www.googleapis.com/auth/documents.readonly',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file'
    ],
});

google.options({ auth });
//config complete



exports.summarize = async (documentID) => {
   
    //get docs function
    const getDocs = async (documentID) => {
        const res = await docs.documents.get({
            documentId: documentID,
        });
        //   console.log(util.inspect(res.data, false, 17));
        return res.data;
    }

    //function to call gpt for summary
    const callGPT = async (content, title) => {

        let messages = [
            { "role": "system", "content": "You are a helpful assistant. You will provide a comprehensive summary and analysis of the google doc content you are provided." },
            {
                "role": "user", "content": `This is my document.
          Title: ${title}
          Content: ${content}
          `}
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages,
            // stream: true,
        });

        return completion.choices[0].message.content;
    };

    //main service code 
    try {
        let fullContent = "";
        let document = await getDocs(documentID);
        let content = document.body.content;

        for (const text of content) {
            if (text) {
                fullContent = fullContent.concat(" ", text.paragraph?.elements[0]?.textRun?.content)
            }
        };
        // console.log(fullContent);
        let response = await callGPT(fullContent, document.title)
        let object = {
            summary: response,
            title: document.title,
            url: `https://docs.google.com/document/d/${documentID}`
        }
        return object;
    } catch (error) {
        // throw new Error("Unable to use document service");
        console.log(error);
    }

}