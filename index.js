import { openai, supabase } from './config.js';
import movies from './content.js'

async function main(moviesData) {
  // Extraire le contenu textuel de chaque film
  const textChunks = moviesData.map(movie => movie.content);
  
  const data = await Promise.all(
    textChunks.map(async (textChunk) => {
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: textChunk
      });
      return {
        content: textChunk,
        embeddings: embeddingResponse.data[0].embedding
      }
    })
  );
  await supabase.from('movies').insert(data);
  console.log('Embedding and storing complete');
  console.log("👉 Données à insérer dans Supabase:", data);
await supabase.from('movies').insert(data);

}
main(movies)