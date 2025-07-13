function startSelection() {
    const peopleCount = document.getElementById('peopleCount').value.trim();
    const timeAvailable = document.getElementById('timeAvailable').value.trim();
    
    // Validation basique
    if (!peopleCount || !timeAvailable) {
        alert('Please fill in both fields before starting.');
        return;
    }
    
    // Stocker les valeurs dans localStorage pour les utiliser dans index.html
    localStorage.setItem('peopleCount', peopleCount);
    localStorage.setItem('timeAvailable', timeAvailable);
    
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