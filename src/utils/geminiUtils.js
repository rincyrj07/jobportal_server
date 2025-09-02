const {GoogleGenerativeAI} = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI("AIzaSyACQG1n1LeBLDqBJLzcDJ9B_Ff4p9Hwpq8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const prompt = "1+1=?";

const generateText =async (prompt) =>{
const result = await model.generateContent(prompt);
console.log(result.response.text());
}

module.exports = generateText()