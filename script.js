document.addEventListener('DOMContentLoaded', function() {
    function setupRadioGroup(groupElement) {
        const buttons = groupElement.querySelectorAll('input[type="button"]');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                buttons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.classList.add('inactive');
                });
                
                this.classList.remove('inactive');
                this.classList.add('active');
            });
        });
    }
    
    const radioGroups = document.querySelectorAll('.radioGroup');
    radioGroups.forEach(group => {
        setupRadioGroup(group);
    });
    
    const generateButton = document.querySelector('.fullgreen');
    if (generateButton) {
        generateButton.addEventListener('click', function() {
            // Récupérer le nom du joueur
            const playerNameInput = document.querySelector('.nameInput');
            const playerName = playerNameInput ? playerNameInput.value.trim() || 'Player' : 'Player';
            
            // Debug: vérifier chaque radioGroup directement
            const allRadioGroups = document.querySelectorAll('.radioGroup');
            console.log('Nombre de radioGroups trouvés:', allRadioGroups.length);
            
            // Nouvelle approche : parcourir directement les radioGroups
            const selections = [];
            allRadioGroups.forEach((group, index) => {
                const activeButton = group.querySelector('.active');
                console.log(`RadioGroup ${index + 1}:`, activeButton);
                if (activeButton) {
                    selections.push(activeButton.value);
                } else {
                    console.error(`Aucun bouton actif trouvé dans le radioGroup ${index + 1}`);
                    selections.push('Default');
                }
            });
            
            console.log('Sélections:', selections);
            
            if (selections.length < 4) {
                console.error('Pas assez de sélections trouvées');
                return;
            }
            
            const gameConfig = {
                playerName: playerName,
                lang: selections[0],
                mode: selections[1],
                difficulty: selections[2],
                verifiers: selections[3]
            };
            
            console.log('Game config:', gameConfig);
            
            localStorage.setItem('gameConfig', JSON.stringify(gameConfig));
            
            window.location.href = 'game.html';
        });
    }
    
    const backButton = document.getElementById('homeBut');
    if (backButton) {
        backButton.addEventListener('click', function() {
            console.log('Back to homepage');
        });
    }
});