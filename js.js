const cardContainer = document.getElementById('creature-cards');
        const searchInput = document.getElementById('search');

        // Function to filter cards based on search input
        function filterCards() {
            const searchTerm = searchInput.value.toLowerCase();

            document.querySelectorAll('.card').forEach(card => {
                const cardName = card.getAttribute('data-name');
                const cardDescription = card.getAttribute('data-description');
                const cardDiet = card.getAttribute('data-diet');

                const nameMatch = cardName.toLowerCase().includes(searchTerm);
                const descriptionMatch = cardDescription.toLowerCase().includes(searchTerm);
                const dietMatch = cardDiet.toLowerCase().includes(searchTerm);

                if (nameMatch || descriptionMatch || dietMatch) {
                    card.style.display = 'flex'; // Show the card
                } else {
                    card.style.display = 'none';  // Hide the card
                }
            });
        }

        // Attach event listener to search input
        searchInput.addEventListener('input', filterCards);

        // Function to open the Ark Wiki page in a new window when a card is clicked
        function openArkWikiPage(creatureName) {
            const wikiUrl = `https://www.dododex.com/taming/${creatureName.toLowerCase().replace(' ','')}`;
            window.open(wikiUrl, '_blank');
        }

        // Fetch the JSON data from dinos.json
        fetch('creatures.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(creature => {
                    createCard(creature);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                createCard({"name": "Dodo", "description": "Failed to retreive data, this is a mock.", "diet": "Herbivore"});
                createCard({"name": "Rex", "description": "More mocked data for this test.", "diet": "Carnivore"});
                createCard({"name": "Basilosaurus", "description": "Generates oil, immune to shock damage.", "diet": "Carnivore"});
                createCard({"name": "Diplodocus", "description": "Can carry up to 11 players, has knockback.", "diet": "Herbivore"});                
            });

function createCard(creature) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-name', creature.name);
    card.setAttribute('data-description', creature.description);
    card.setAttribute('data-diet', creature.diet);

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');
    const name = document.createElement('h3');
    name.textContent = creature.name;
    cardTitle.appendChild(name);

    const cardDescription = document.createElement('div');
    cardDescription.classList.add('card-description');
    const description = document.createElement('p');
    description.textContent = creature.description;
    cardDescription.appendChild(description);

    const dietIcon = document.createElement('span');
    dietIcon.classList.add('diet-icon');
    if (creature.diet.toLowerCase() === 'carnivore') {
        dietIcon.innerHTML = '&#127830;'; // Cut of Meat icon “🥩” (U+1F969)
        dietIcon.setAttribute('title', 'Carnivore');
    } else if (creature.diet.toLowerCase() === 'herbivore') {
        dietIcon.innerHTML = '&#127807;'; // Herb icon  “🌿” (U+1F33F)
        dietIcon.setAttribute('title', 'Herbivore');
    }

    const creatureImage = document.createElement('img');
    creatureImage.classList.add('creature-image');
    creatureImage.src = `https://www.dododex.com/media/creature/${creature.name.toLowerCase().replace(' ', '')}.png`;

    // Add click event to open Ark Wiki page
    card.addEventListener('click', () => openArkWikiPage(creature.name));

    card.appendChild(dietIcon);
    card.appendChild(cardTitle);
    card.appendChild(cardDescription);
    card.appendChild(creatureImage);

    cardContainer.appendChild(card);
}



var input = document.getElementById('search');

function appendCharacter (c) {
    switch (c) {
        case 8: // Backspace
            input.value = input.value.slice(0, -1);
            break;
        default:
            input.value = input.value + String.fromCharCode(c);
    }
}

// Keypress gets the keyCode of the current character not key.
// e.g. pressing the 'A' key will result in 'a' unless 'Shift' is also held.
window.addEventListener('keypress', function (e) {
    appendCharacter(e.keyCode);
});

// Use Keydown to get special keys like Backspace, Enter, Esc.
window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 8: // Backspace
            e.preventDefault(); // Stops the backspace key from acting like the back button.
            appendCharacter(e.keyCode);
            break;
    }
});