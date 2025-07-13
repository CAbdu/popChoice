// Récupérer le film recommandé depuis localStorage
const bestMovie = JSON.parse(localStorage.getItem("bestMovie"));
const movieResultDiv = document.getElementById("movie-result");

// Afficher le résultat
if (bestMovie) {
    movieResultDiv.innerHTML = `
        <div class="movie-info">
            <h3>${bestMovie.content || "Film recommandé"}</h3>
            <div class="movie-details">
                <p><strong>Score de correspondance :</strong> ${(bestMovie.similarity * 100).toFixed(1)}%</p>
            </div>
        </div>
    `;
} else {
    movieResultDiv.innerHTML = `
        <div class="movie-info">
            <h3>Aucun film trouvé</h3>
            <p>Désolé, nous n'avons pas pu trouver de film correspondant à vos préférences.</p>
        </div>
    `;
}

// Gestion des boutons
document.getElementById("new-search").addEventListener("click", () => {
    window.location.href = "index.html";
});

document.getElementById("back-home").addEventListener("click", () => {
    window.location.href = "index.html";
}); 