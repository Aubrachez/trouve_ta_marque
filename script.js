let questions = [];
let currentQuestionIndex = 0;
let resultats = [];

// Charger les questions depuis le fichier JSON
fetch('question.json')
    .then(response => response.json())
    .then(data => {
        questions = data.questions;
        displayQuestion(currentQuestionIndex);
    })
    .catch(error => console.error('Erreur lors du chargement des questions:', error));

// Afficher la question actuelle
function displayQuestion(index) {
    const titleElement = document.querySelector('.title');
    const nextBtn = document.querySelector('.next-btn');
    const previousBtn = document.querySelector('.previous-btn');
    const slider = document.querySelector('.slider');
    const sliderlabel = document.querySelector('.sliderlabel');
    const sliderelabel = document.querySelector('.sliderelabel');
    if (index < questions.length) {
        titleElement.textContent = questions[index].question;
        slider.style.display = 'block';
        nextBtn.style.display = 'block';
        previousBtn.style.display = 'block';

        // Restaurer la valeur précédente du slider si elle existe
        const existingAnswer = resultats.find(item => item.questionId === index + 1);
        slider.value = existingAnswer ? existingAnswer.valeur : 50;

        // Supprimer le bouton "Voir mes notes" s'il existe
        const existingSeeResultsBtn = document.querySelector('.see-results-btn');
        if (existingSeeResultsBtn) {
            existingSeeResultsBtn.remove();
        }
    } else {
        // Quiz terminé
        titleElement.textContent = "Vous avez terminé le quiz !";
        nextBtn.style.display = 'none';
        previousBtn.style.display = 'none';
        slider.style.display = 'none';
        sliderlabel.style.display = 'none';
        sliderelabel.style.display = 'none';
        // Bouton "Voir mes notes"
        const seeResultsBtn = document.createElement('button');
        seeResultsBtn.textContent = "Voir mes notes";
        seeResultsBtn.href = "result.html";
        seeResultsBtn.classList.add('see-results-btn');
        seeResultsBtn.onclick = () => {
            window.document.location.href='result.html';
            console.log("Résultats du quiz :", resultats);
           
        };
        document.querySelector('.centered-div').appendChild(seeResultsBtn);
    }
}

// Bouton "Next"
document.querySelector('.next-btn').addEventListener('click', () => {
    const slider = document.querySelector('.slider');
    
    // Mettre à jour ou ajouter la réponse
    const existingIndex = resultats.findIndex(item => item.questionId === currentQuestionIndex + 1);
    valeurslider= parseInt(slider.value);

    if (valeurslider >= 0 && valeurslider <= 20) {
        console.log("A");
        note=0;
    } else if (valeurslider >= 21 && valeurslider <= 40) {
        console.log("B");
        note=1;
    } else if (valeurslider >= 41 && valeurslider <= 60) {
        console.log("C");
        note=2;
    } else if (valeurslider >= 61 && valeurslider <= 80) {
        console.log("D");
        note=3;
    } else {
        console.log("E");
        note=4;
    }


    if (existingIndex !== -1) {
        resultats[existingIndex].valeur = note;
    } else {
        resultats.push({
            questionId: currentQuestionIndex + 1,
            valeur: note
        });
    }

    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
});

// Bouton "Previous"
document.querySelector('.previous-btn').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    }
});
