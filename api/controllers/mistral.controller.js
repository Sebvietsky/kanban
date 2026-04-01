import { StatusCodes } from 'http-status-codes';
import 'dotenv/config'

export function prompt(prompt) {
    return async (req, res, next) => {
        console.log(prompt)
        try {
            const response = await fetch(`${process.env.MISTRAL_BASE_URL}/chat/completions`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: `${process.env.MISTRAL_MODEL}`,
                    messages: [
                        {
                            role: "user",
                            content: prompt? req.body.prompt : `${process.env.MISTRAL_BASE_PROMPT_SPELLCHECKER} : ${req.body.prompt}`,
                        },
                    ],
                }),
            });
            
            if (!response.ok) {
                res.status(StatusCodes.NOT_FOUND).json({ error: "Erreur" })
            }
    
            const result = await response.json()
            const answer = result?.choices?.[0]?.message?.content
            console.log(answer)
    
            if(!answer) {
                throw new Error ('Réponse Mistral invalide')
            }
    
            res.status(StatusCodes.OK).json(answer)
    
        } catch (error) {
            res.status(StatusCodes.FORBIDDEN).json({ error: error.message })
        }
    }
}