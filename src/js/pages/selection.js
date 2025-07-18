function startSelection() {
    const peopleCount = parseInt(document.getElementById('peopleCount').value.trim(), 10);
    const timeAvailable = document.getElementById('timeAvailable').value.trim();
    
    // Validation basique
    if (!peopleCount || !timeAvailable) {
        alert('Please fill in both fields before starting.');
        return;
    }
    if (isNaN(peopleCount) || peopleCount < 1 || peopleCount > 5) {
        alert('Le nombre de personnes doit être compris entre 1 et 5.');
        return;
    }
    
    // Stocker les valeurs dans localStorage pour les utiliser dans questions.html
    localStorage.setItem('peopleCount', peopleCount);
    localStorage.setItem('timeAvailable', timeAvailable);
    localStorage.setItem('currentPerson', 1); // On commence à la première personne
    localStorage.setItem('allAnswers', JSON.stringify([])); // On initialise le tableau des réponses
    
    // Rediriger vers la page des questions
    window.location.href = 'questions.html';
}

// Permettre de valider avec la touche Entrée
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.selection-input');
    
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                startSelection();
            }
        });
    });
}); 