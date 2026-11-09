import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js"

export const generateRecipeFromGemini = async (ingredients) => {

const prompt = `Use the following ingredients to create a delicious and practical recipe:

${ingredients.join(", ")}

Create the recipe with:
- Recipe title
- Short description
- Ingredients with quantities
- Step-by-step cooking instructions
- Cooking time
- Number of servings

Use the provided ingredients as the main ingredients. You can add basic ingredients such as salt, oil, spices, or water if needed.

Return the recipe in a clear and easy-to-understand format.
`;

    const ai = new GoogleGenAI({
        apiKey: config.GEMINI_API_KEY
    });

    const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: prompt,
    });

    return interaction.output_text

}