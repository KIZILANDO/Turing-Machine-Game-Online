document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour gérer la sélection des boutons dans un groupe
    function setupRadioGroup(groupElement) {
        const buttons = groupElement.querySelectorAll('input[type="button"]');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Désactiver tous les boutons du groupe
                buttons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.add('inactive');
                });
                
                // Activer le bouton cliqué
                this.classList.remove('inactive');
                this.classList.add('active');
            });
        });
    }
    
    // Appliquer la fonctionnalité à tous les groupes radio
    const radioGroups = document.querySelectorAll('.radioGroup');
    radioGroups.forEach(group => {
        setupRadioGroup(group);
    });
    
    // Gérer le bouton GENERATE
    const generateButton = document.querySelector('.fullgreen');
    if (generateButton) {
        generateButton.addEventListener('click', function() {
            // Récupérer les valeurs sélectionnées
            const gameType = document.querySelector('.radioGroup:nth-of-type(1) .active').value;
            const mode = document.querySelector('.radioGroup:nth-of-type(2) .active').value;
            const difficulty = document.querySelector('.radioGroup:nth-of-type(3) .active').value;
            const verifiers = document.querySelector('.radioGroup:nth-of-type(4) .active').value;
            
            // Stocker les paramètres dans le localStorage pour les récupérer dans game.html
            const gameConfig = {
                gameType: gameType,
                mode: mode,
                difficulty: difficulty,
                verifiers: verifiers
            };
            
            localStorage.setItem('gameConfig', JSON.stringify(gameConfig));
            
            // Rediriger vers game.html
            window.location.href = 'game.html';
        });
    }
    
    // Gérer le bouton Back to Homepage
    const backButton = document.getElementById('homeBut');
    if (backButton) {
        backButton.addEventListener('click', function() {
            // Ajouter ici la logique de retour à la page d'accueil
            console.log('Retour à la page d\'accueil');
        });
    }
});