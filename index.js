import { openai, supabase } from './config.js';
import movies from './content.js'

// Vérifier si l'utilisateur vient de la page de sélection
document.addEventListener('DOMContentLoaded', function() {
  const peopleCount = localStorage.getItem('peopleCount');
  const timeAvailable = localStorage.getItem('timeAvailable');
  
  // Si les valeurs de sélection ne sont pas présentes, rediriger vers index.html (page de sélection)
  if (!peopleCount || !timeAvailable) {
    window.location.href = 'index.html';
    return;
  }
});

const submitBtn = document.querySelector(".submit-button");

// Event listener pour le bouton de soumission
submitBtn.addEventListener("click", async () => {
  // Récupérer les valeurs de la page de sélection
  const peopleCount = localStorage.getItem('peopleCount') || '';
  const timeAvailable = localStorage.getItem('timeAvailable') || '';
  
  const r1 = document.getElementById("q1").value.trim();
  const r2 = document.getElementById("q2").value.trim();
  const r3 = document.getElementById("q3").value.trim();

  const userInput = `People: ${peopleCount}, Time: ${timeAvailable}. ${r1}. ${r2}. ${r3}.`;

  try {
    // Créer un embedding pour l'entrée utilisateur
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: userInput
    });
    const userEmbedding = embeddingResponse.data[0].embedding;

    // Appel de la fonction SQL sur Supabase
    const { data, error } = await supabase.rpc("match_movies", {
      query_embedding: userEmbedding,
      match_threshold: 0.75,
      match_count: 1
    });

    if (error) {
      console.error("Supabase RPC error:", error.message);
      alert("Erreur Supabase : " + error.message);
      return;
    }

    if (!data || data.length === 0) {
      alert("Aucun film correspondant trouvé.");
      return;
    }

    const bestMatch = data[0];

    // Stocker dans localStorage et rediriger
    localStorage.setItem("bestMovie", JSON.stringify(bestMatch));
    window.location.href = "result.html";

  } catch (err) {
    console.error("Erreur OpenAI ou fetch:", err.message);
    alert("Une erreur est survenue pendant le traitement.");
  }
});

// Fonction pour initialiser les données des films (commentée)
// async function main(moviesData) {
//   // Extraire le contenu textuel de chaque film
//   const textChunks = moviesData.map(movie => movie.content);
  
//   const data = await Promise.all(
//     textChunks.map(async (textChunk) => {
//       const embeddingResponse = await openai.embeddings.create({
//         model: "text-embedding-ada-002",
//         input: textChunk
//       });
//       return {
//         content: textChunk,
//         embeddings: embeddingResponse.data[0].embedding
//       }
//     })
//   );
  
//   await supabase.from('movies').insert(data);
//   console.log('Embedding and storing complete');
//   console.log("👉 Données à insérer dans Supabase:", data);
// }