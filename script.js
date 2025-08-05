document.addEventListener("DOMContentLoaded", function () {
  function setupRadioGroup(groupElement) {
    const buttons = groupElement.querySelectorAll('input[type="button"]');

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        buttons.forEach((btn) => {
          btn.classList.remove("active");
          btn.classList.add("inactive");
        });

        this.classList.remove("inactive");
        this.classList.add("active");
      });
    });
  }

  const radioGroups = document.querySelectorAll(".radioGroup");
  radioGroups.forEach((group) => {
    setupRadioGroup(group);
  });

  const generateButton = document.querySelector('input[value="GENERATE"]');
  const loadButton = document.querySelector('input[value="LOAD"]');

  if (generateButton) {
    generateButton.addEventListener("click", function () {
      const playerNameInput = document.querySelector(".nameInput");
      const playerName = playerNameInput
        ? playerNameInput.value.trim() || "Player"
        : "Player";
      const allRadioGroups = document.querySelectorAll(".radioGroup");

      const selections = [];
      allRadioGroups.forEach((group, index) => {
        const activeButton = group.querySelector(".active");
        console.log(`RadioGroup ${index + 1}:`, activeButton);
        if (activeButton) {
          selections.push(activeButton.value);
        } else {
          console.error(
            `Aucun bouton actif trouvé dans le radioGroup ${index + 1}`
          );
          selections.push("Default");
        }
      });

      console.log("Sélections:", selections);

      if (selections.length < 4) {
        console.error("Pas assez de sélections trouvées");
        return;
      }

      const gameConfig = {
        playerName: playerName,
        lang: selections[0],
        mode: selections[1],
        difficulty: selections[2],
        verifiers: selections[3],
        is_new: true,
      };

      console.log("Game config:", gameConfig);

      localStorage.setItem("gameConfig", JSON.stringify(gameConfig));

      window.location.href = "game.html";
    });
  }
  if (loadButton) {
    loadButton.addEventListener("click", function () {
      const playerNameInput = document.querySelector(".nameInput");
      const playerName = playerNameInput
        ? playerNameInput.value.trim() || "Player"
        : "Player";
      const allRadioGroups = document.querySelectorAll(".radioGroup");

      const selections = [];
      allRadioGroups.forEach((group, index) => {
        const activeButton = group.querySelector(".active");
        console.log(`RadioGroup ${index + 1}:`, activeButton);
        if (activeButton) {
          selections.push(activeButton.value);
        } else {
          console.error(
            `Aucun bouton actif trouvé dans le radioGroup ${index + 1}`
          );
          selections.push("Default");
        }
      });

      console.log("Sélections:", selections);

      if (selections.length < 4) {
        console.error("Pas assez de sélections trouvées");
        return;
      }
      const gameIdInput = document.querySelector(".bigInput");
      const gameId = gameIdInput ? gameIdInput.value.trim() : "";

      if (!gameId) {
        console.error("Veuillez entrer un Game ID");
        return;
      }

      console.log("Game ID saisi:", gameId);
      const gameConfig = {
        playerName: playerName,
        lang: selections[0],
        code: gameId,
        is_new: false,
      };

      console.log("Game config:", gameConfig);

      localStorage.setItem("gameConfig", JSON.stringify(gameConfig));

      window.location.href = "game.html";

      // Ici vous pouvez ajouter la logique pour charger le jeu avec cet ID
      //localStorage.setItem('gameId', gameId);
      //window.location.href = 'game.html';
    });
  }

  const backButton = document.getElementById("homeBut");
  if (backButton) {
    backButton.addEventListener("click", function () {
      console.log("Back to homepage");
    });
  }
});
