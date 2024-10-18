import { GoogleGenerativeAI } from "@google/generative-ai";
import { OPENAI_API_KEY } from "./constants";

// import { GoogleGenerativeAI } from "@google/generative-ai";
const openAI = new GoogleGenerativeAI(OPENAI_API_KEY);

export default openAI;