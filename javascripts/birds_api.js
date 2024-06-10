
const API_URL = 'https://freetestapi.com/api/v1/birds'
const SEARCH_API = 'https://freetestapi.com/api/v1/birds?search='

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Get initial pets
getPets(API_URL);

async function getPets(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (Array.isArray(data)) {
            showPets(data);
        } else if (data && data.birds && Array.isArray(data.birds)) {
            showPets(data.birds);
        } else {
            console.error('Unexpected data structure:', data);
            main.innerHTML = '<p>No birds found.</p>';
        }
    } catch (error) {
        console.error('Error fetching birds:', error);
        main.innerHTML = '<p>Error fetching birds.</p>';
    }
}

function showPets(pets) {
    main.innerHTML = '';

    pets.forEach((pet) => {
        const petEl = document.createElement('div');
        petEl.classList.add('pet');

        let petHTML = '<img src="' + pet.image + '" alt="' + pet.name + '">';
        petHTML += '<div class="pet-info">';
        petHTML += '<h3>' + pet.name + '</h3>';
        petHTML += '<p>' + pet.place_of_found + '</p>';
        petHTML += '</div>';
        petHTML += '<div class="overview">';
        petHTML += '<h3>Details</h3>';

        // Iterate over each property of the pet object
        for (const key in pet) {
            if (pet.hasOwnProperty(key) && key !== 'image' && key !== 'id' ) {
                petHTML += '<p><strong>' + key + ':</strong> ' + pet[key] + '</p>';
            }
        }

        petHTML += '</div>';
        petEl.innerHTML = petHTML;

        // Toggle the overview visibility on click
        petEl.addEventListener('click', () => {
            petEl.querySelector('.overview').classList.toggle('show-overview');
        });
        main.appendChild(petEl);
    });
}

// Search functionality
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = search.value.trim();
    if (searchTerm) {
        const searchURL = SEARCH_API + encodeURIComponent(searchTerm);
        try {
            const res = await fetch(searchURL);
            const data = await res.json();
            if (Array.isArray(data)) {
                showPets(data);
            } else if (data && data.birds && Array.isArray(data.birds)) {
                showPets(data.birds);
            } else {
                console.error('Unexpected data structure:', data);
                main.innerHTML = '<p>No birds found.</p>';
            }
        } catch (error) {
            console.error('Error fetching birds:', error);
            main.innerHTML = '<p>Error fetching birds.</p>';
        }
    } else {
        // If search term is empty, reload all birds
        getPets(API_URL);
    }
});