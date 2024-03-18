const { DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
const { AzureKeyCredential } = require("@azure/core-auth");
require('dotenv').config();



exports.getFormData = async (imageUrl) => {
    const key = process.env.AZURE_DOCUMENT_KEY;
    const endpoint = process.env.AZURE_DOCUMENT_ENDPOINT;
    
    const formUrl = imageUrl;

    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

    const poller = await client.beginAnalyzeDocument("prebuilt-document", formUrl);
    const { pages, keyValuePairs } = await poller.pollUntilDone();

    if (pages[0].lines <= 0) {
        return {
            status: 400,
            message: "Unable to parse image.",
        };
    } else {
        const lines = pages[0].lines;
        const lineArray = lines.map(line => line.content);
        return {
            form_text: lineArray,
            image: imageUrl
        };
    }
};
