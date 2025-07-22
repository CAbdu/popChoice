import movies from '../content.js';

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
        // Filtrer les films selon le temps disponible
        const maxMinutes = parseInt(timeAvailable, 10);
        const filteredMovies = movies.filter(movie => {
            // Extraire la durée du champ content, format attendu : (X hr YY min) ou (X hr) ou (YY min)
            const match = movie.content.match(/\((\d+)\s*hr(?:\s*(\d+)\s*min)?\)|\((\d+)\s*min\)/i);
            let duration = 0;
            if (match) {
                if (match[1]) {
                    duration += parseInt(match[1], 10) * 60;
                    if (match[2]) duration += parseInt(match[2], 10);
                } else if (match[3]) {
                    duration += parseInt(match[3], 10);
                }
            }
            return duration > 0 && duration <= maxMinutes;
        });
        if (filteredMovies.length > 0) {
            let currentIndex = 0;
            function showMovies(startIdx) {
                const movieResult = document.getElementById('movie-result');
                movieResult.innerHTML = '';
                const toShow = filteredMovies.slice(startIdx, startIdx + 3);
                toShow.forEach(movie => {
                    movieResult.innerHTML += renderMovieHTML(movie);
                });
                // Ajouter le bouton Next si besoin
                if (filteredMovies.length > startIdx + 3) {
                    if (!document.getElementById('next-movies')) {
                        const btn = document.createElement('button');
                        btn.id = 'next-movies';
                        btn.textContent = 'Next movies';
                        btn.onclick = function() {
                            currentIndex += 3;
                            showMovies(currentIndex);
                        };
                        movieResult.appendChild(btn);
                    }
                } else {
                    const btn = document.getElementById('next-movies');
                    if (btn) btn.remove();
                }
            }
            // Fonction pour générer le HTML d'un film
            function renderMovieHTML(movie) {
                return `
                    <div class="movie-info">
                        <h3>${movie.title || 'Grab some Popcorn'}</h3>
                        <p class="movie-description">${movie.content || 'Description du film'}</p>
                        ${movie.year ? `<p class="movie-year">Année: ${movie.year}</p>` : ''}
                        ${movie.genre ? `<p class="movie-genre">Genre: ${movie.genre}</p>` : ''}
                    </div>
                `;
            }
            showMovies(currentIndex);
        } else {
            document.getElementById('movie-result').innerHTML = '<p>Aucun film ne correspond à la durée disponible.</p>';
        }
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