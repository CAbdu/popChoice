document.addEventListener('DOMContentLoaded', function() {
    // Récupérer toutes les réponses depuis localStorage
    const allAnswers = JSON.parse(localStorage.getItem('allAnswers') || '[]');
    const timeAvailable = localStorage.getItem('timeAvailable') || '';
    
    if (!allAnswers || allAnswers.length === 0) {
        // Si pas de données, rediriger vers la page de sélection
        window.location.href = 'selection.html';
        return;
    }
    
    // Fusionner toutes les réponses pour créer un prompt collectif
    const peopleCount = allAnswers.length;
    let prompt = '';
    prompt += `Temps disponible pour le groupe : ${timeAvailable}\n\n`;
    allAnswers.forEach((answers, idx) => {
        prompt += `Personne ${idx+1} :\n`;
        prompt += `- Q1 : ${answers.q1}\n`;
        prompt += `- Q2 : ${answers.q2}\n`;
        prompt += `- Q3 : ${answers.q3}\n`;
        if (answers.q4) prompt += `- Q4 : ${answers.q4}\n`;
        prompt += '\n';
    });

    // Stocker le prompt collectif pour l'utiliser dans l'IA
    localStorage.setItem('collectivePrompt', prompt);

    // --- Affichage du résultat (existant) ---
    // Récupérer le film recommandé depuis localStorage (si déjà calculé)
    const movieData = localStorage.getItem('bestMovie');
    if (movieData) {
        const movie = JSON.parse(movieData);
        displayMovie(movie);
    } else {
        // Afficher un message d'attente ou lancer la requête IA ici
        document.getElementById('movie-result').innerHTML = '<p>Processing in progress...</p>';
        // TODO : Lancer la requête IA ici avec le prompt collectif
    }
    
    // Event listeners pour les boutons
    document.getElementById('new-search').addEventListener('click', function() {
        // Nettoyer localStorage et rediriger vers la page de sélection
        localStorage.removeItem('peopleCount');
        localStorage.removeItem('timeAvailable');
        localStorage.removeItem('bestMovie');
        localStorage.removeItem('allAnswers');
        localStorage.removeItem('currentPerson');
        localStorage.removeItem('collectivePrompt');
        window.location.href = 'selection.html';
    });
    
    document.getElementById('back-home').addEventListener('click', function() {
        // Nettoyer localStorage et rediriger vers la page de sélection
        localStorage.removeItem('peopleCount');
        localStorage.removeItem('timeAvailable');
        localStorage.removeItem('bestMovie');
        localStorage.removeItem('allAnswers');
        localStorage.removeItem('currentPerson');
        localStorage.removeItem('collectivePrompt');
        window.location.href = 'selection.html';
    });
});

function displayMovie(movie) {
    const movieResult = document.getElementById('movie-result');
    
    // Créer le contenu HTML pour afficher le film
    const movieHTML = `
        <div class="movie-info">
            <h3>${movie.title || 'Grab some Popcorn'}</h3>
            <p class="movie-description">${movie.content || 'Description du film'}</p>
            ${movie.year ? `<p class="movie-year">Année: ${movie.year}</p>` : ''}
            ${movie.genre ? `<p class="movie-genre">Genre: ${movie.genre}</p>` : ''}
        </div>
    `;
    
    movieResult.innerHTML = movieHTML;
} 