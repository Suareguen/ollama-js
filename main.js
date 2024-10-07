import express from 'express';
import ollama from 'ollama'; // Importa Ollama de manera correcta

const app = express();
const port = 3000;

app.use(express.json());

app.post('/ollama', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'No se envió ningún prompt' });
        }

        // Usar el método correcto de la librería Ollama
        const response = await ollama.chat({
            model: 'llama3.1',
            messages: [{ role: 'user', content: prompt }],
          })
        console.log(response.message.content)

        res.json(response.message.content);
    } catch (error) {
        console.error("Error llamando a Ollama:", error);
        res.status(500).json({ error: 'Error procesando la petición' });
    }
});

app.listen(port, () => {
    console.log(`Servidor Express ejecutándose en http://localhost:${port}`);
});
