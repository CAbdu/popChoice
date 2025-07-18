import { openai, supabase } from '../config.js';
import movies from '../content.js'

let submitBtn;

function setupChoiceButtons() {
  ["q2-group", "q3-group"].forEach(groupId => {
    const group = document.getElementById(groupId);
    if (group) {
      group.querySelectorAll(".choices").forEach(btn => {
        btn.addEventListener("click", function() {
          group.querySelectorAll(".choices").forEach(b => b.classList.remove("active-choice"));
          btn.classList.add("active-choice");
        });
      });
    }
  });
}

function updatePersonCounter() {
  const peopleCount = parseInt(localStorage.getItem('peopleCount'), 10);
  const currentPerson = parseInt(localStorage.getItem('currentPerson'), 10) || 1;
  const counterDiv = document.getElementById('person-counter');
  if (counterDiv) {
    if (peopleCount > 1) {
      const reste = peopleCount - currentPerson + 1;
      if (reste > 1) {
        counterDiv.textContent = ` ${reste} person..`;
      } else {
        counterDiv.textContent = `You're the last !`;
      }
    } else {
      counterDiv.textContent = '';
    }
  }
}

function updateButtons() {
  const peopleCount = parseInt(localStorage.getItem('peopleCount'), 10);
  const currentPerson = parseInt(localStorage.getItem('currentPerson'), 10) || 1;
  const nextBtn = document.getElementById('next-person');
  if (currentPerson < peopleCount) {
    nextBtn.style.display = 'block';
    submitBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'block';
  }
}

function resetForm() {
  document.getElementById("q1").value = '';
  document.getElementById("q4").value = '';
  // Réinitialiser la sélection des boutons q2/q3
  ["q2-group", "q3-group"].forEach(groupId => {
    const group = document.getElementById(groupId);
    if (group) {
      group.querySelectorAll(".choices").forEach(b => b.classList.remove("active-choice"));
    }
  });
}

function getAnswers() {
  const q2Btn = document.querySelector('#q2-group .choices.active-choice');
  const q3Btn = document.querySelector('#q3-group .choices.active-choice');
  return {
    q1: document.getElementById("q1").value.trim(),
    q2: q2Btn ? q2Btn.textContent.trim() : '',
    q3: q3Btn ? q3Btn.textContent.trim() : '',
    q4: document.getElementById("q4") ? document.getElementById("q4").value.trim() : ''
  };
}

function validateAnswers(answers) {
  if (!answers.q1) {
    alert('Merci de répondre à la question 1.');
    return false;
  }
  if (!answers.q2) {
    alert('Merci de sélectionner une réponse pour la question 2.');
    return false;
  }
  if (!answers.q3) {
    alert('Merci de sélectionner une réponse pour la question 3.');
    return false;
  }
  return true;
}

document.addEventListener('DOMContentLoaded', function() {
  submitBtn = document.querySelector('.submit-button');
  setupChoiceButtons();
  updatePersonCounter();
  updateButtons();

  // Passer à la personne suivante
  const nextBtn = document.getElementById('next-person');
  if (nextBtn) {
    nextBtn.onclick = function() {
      const answers = getAnswers();
      if (!validateAnswers(answers)) return;
      let allAnswers = JSON.parse(localStorage.getItem('allAnswers') || '[]');
      allAnswers.push(answers);
      localStorage.setItem('allAnswers', JSON.stringify(allAnswers));
      // Incrémenter la personne
      let currentPerson = parseInt(localStorage.getItem('currentPerson'), 10) || 1;
      localStorage.setItem('currentPerson', currentPerson + 1);
      resetForm();
      updatePersonCounter();
      updateButtons();
    };
  }

  // Soumission finale (pour la dernière personne)
  if (submitBtn) {
    submitBtn.onclick = async function() {
      const answers = getAnswers();
      if (!validateAnswers(answers)) return;
      let allAnswers = JSON.parse(localStorage.getItem('allAnswers') || '[]');
      allAnswers.push(answers);
      localStorage.setItem('allAnswers', JSON.stringify(allAnswers));
      window.location.href = "result.html";
    };
  }
});

