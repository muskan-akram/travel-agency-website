
window.addEventListener("load", () => {
  document.body.classList.add("bg-loaded");
});
const mockApiData = {
    "countries": [
        {
            "id": 1,
            "name": "Australia",
            "cities": [
                { "name": "Sydney, Australia", "imageUrl": "enter_your_image_for_sydney.jpg", "description": "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge." },
                { "name": "Melbourne, Australia", "imageUrl": "enter_your_image_for_melbourne.jpg", "description": "A cultural hub famous for its art, food, and diverse neighborhoods." }
            ]
        },
        {
            "id": 2,
            "name": "Japan",
            "cities": [
                { "name": "Tokyo, Japan", "imageUrl": "enter_your_image_for_tokyo.jpg", "description": "A bustling metropolis blending tradition and modernity, famous for its cherry blossoms and rich culture." },
                { "name": "Kyoto, Japan", "imageUrl": "enter_your_image_for_kyoto.jpg", "description": "Known for its historic temples, gardens, and traditional tea houses." }
            ]
        },
        {
            "id": 3,
            "name": "Brazil",
            "cities": [
                { "name": "Rio de Janeiro, Brazil", "imageUrl": "enter_your_image_for_rio.jpg", "description": "A lively city known for its stunning beaches, vibrant carnival celebrations, and iconic landmarks." },
                { "name": "São Paulo, Brazil", "imageUrl": "enter_your_image_for_sao-paulo.jpg", "description": "The financial hub with diverse culture, arts, and a vibrant nightlife." }
            ]
        }
    ],
    "temples": [
        { "id": 1, "name": "Angkor Wat, Cambodia", "imageUrl": "enter_your_image_for_angkor-wat.jpg", "description": "A UNESCO World Heritage site and the largest religious monument in the world." },
        { "id": 2, "name": "Taj Mahal, India", "imageUrl": "enter_your_image_for_taj-mahal.jpg", "description": "An iconic symbol of love and a masterpiece of Mughal architecture." }
    ],
    "beaches": [
        { "id": 1, "name": "Bora Bora, French Polynesia", "imageUrl": "enter_your_image_for_bora-bora.jpg", "description": "An island known for its stunning turquoise waters and luxurious overwater bungalows." },
        { "id": 2, "name": "Copacabana Beach, Brazil", "imageUrl": "enter_your_image_for_copacabana.jpg", "description": "A famous beach in Rio de Janeiro, Brazil, with a vibrant atmosphere and scenic views." }
    ]
};

// --- Global Variables (JavaScript) ---
const searchButton = document.getElementById('search-button');
const resetButton = document.getElementById('reset-button');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('recommendation-results');
const searchBarContainer = document.getElementById('search-bar-container');

const homeView = document.getElementById('home-view');
const aboutPage = document.getElementById('about-us-page');
const contactPage = document.getElementById('contact-us-page');
const recHeading = document.getElementById('recommendation-heading');


// Task 6: REAL Fetch Data Function using the fetch API
async function fetchRecommendations() {
    try {
        // This assumes your JSON file is in the same directory as your HTML
        const response = await fetch('travel_recommendation_api.json');

        // Check if the fetch was successful
        if (!response.ok) {
            console.error(`Fetch failed with status: ${response.status}. Falling back to mock data.`);
            return mockApiData; // Fallback to mock data if fetch fails
        }

        const data = await response.json();
        console.log("Data successfully fetched:", data); // Checkpoint for Task 6
        return data;

    } catch (error) {
        console.error("Error fetching recommendations:", error);
        console.warn("Using mock data as a fallback.");
        return mockApiData; // Fallback in case of network error
    }
}

// Task 10: Get Local Time Logic (Note: TimeZones for the new data are NOT included in the JSON, so this will rarely display time.)
function getLocalTime(timeZone) {
    if (!timeZone) return '';
    const options = {
        timeZone: timeZone,
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    try {
        const currentTime = new Date().toLocaleTimeString('en-US', options);
        return `Current Time: ${currentTime}`;
    } catch (e) {
        return '';
    }
}

// Task 7 & 8: Display Results Function
async function displayResults(keyword) {
    resultsContainer.innerHTML = '';
    recHeading.classList.remove('hidden');

    const data = await fetchRecommendations();
    if (!data) return;

    const lowerKeyword = keyword.toLowerCase().trim();
    let recommendations = [];

    // Task 7: Keyword Matching Logic using toLowerCase()
    if (lowerKeyword.includes('beach') || lowerKeyword.includes('beaches')) {
        recommendations = data.beaches;
    } else if (lowerKeyword.includes('temple') || lowerKeyword.includes('temples')) {
        recommendations = data.temples;
    } else {
        // Check for specific country name (e.g., "japan")
        const country = data.countries.find(c => lowerKeyword.includes(c.name.toLowerCase()));
        if (country) {
            recommendations = country.cities;
        }
        // Check for generic country search
        else if (lowerKeyword.includes('country') || lowerKeyword.includes('countries')) {
            recommendations = data.countries.flatMap(c => c.cities);
        }
    }

    // Task 8: Render Cards
    recommendations.forEach(item => {
        const name = item.name;
        const description = item.description;
        // IMPORTANT: The image URLs in your JSON are placeholders ("enter_your_image...")
        // If you haven't added real image paths, this will show broken image icons.
        const imageUrl = item.imageUrl;
        const itemTimeZone = item.timeZone;

        const card = document.createElement('div');
        card.className = 'recommendation-card';

        // Task 10: Display local time (will only work if 'timeZone' is added to the JSON)
        const timeDisplay = itemTimeZone ? `<p class="time-display">${getLocalTime(itemTimeZone)}</p>` : '';

        card.innerHTML = `
          <img src="${imageUrl}" alt="${name}">
          <div class="card-content">
            <h3>${name}</h3>
            <p>${description}</p>
            ${timeDisplay}
          </div>
        `;

        resultsContainer.appendChild(card);
    });

    // Handle no results
    if (recommendations.length === 0 && lowerKeyword !== '') {
        resultsContainer.innerHTML = `<p style="text-align: center; width: 100%; font-size: 1.2em; color: #ddd;">
                                            No specific recommendations found for "${keyword}". Please try 'beach', 'temple', or a country name like 'Japan', 'Australia', or 'Brazil'.
                                          </p>`;
    }
}

// Page Navigation Logic
function navigateTo(pageId) {
    // Hide all major content sections
    homeView.classList.add('hidden');
    aboutPage.classList.add('hidden');
    contactPage.classList.add('hidden');

    // Control visibility of the search bar
    if (pageId === 'home') {
        homeView.classList.remove('hidden');
        searchBarContainer.classList.remove('hidden');
    } else {
        searchBarContainer.classList.add('hidden');
        recHeading.classList.add('hidden');
    }

    if (pageId === 'about') {
        aboutPage.classList.remove('hidden');
    } else if (pageId === 'contact') {
        contactPage.classList.remove('hidden');
    }

    // Scroll to the top of the content area
    document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
}


// --- Event Listeners ---
document.getElementById('nav-home').addEventListener('click', () => {
    navigateTo('home');
    if (searchInput.value === '' && resultsContainer.children.length === 0) {
        resetRecommendations();
    }
});
document.getElementById('nav-about').addEventListener('click', () => {
    navigateTo('about');
});
document.getElementById('nav-contact').addEventListener('click', () => {
    navigateTo('contact');
});

// Task 7 & 8: Search Button Handler (With scroll fix for visibility)
searchButton.addEventListener('click', () => {
    const keyword = searchInput.value;
    if (keyword) {
        navigateTo('home');

        // Use .then() to ensure the scroll happens AFTER the new content is rendered
        displayResults(keyword).then(() => {
            // Scroll down to the results area so the user can immediately see the recommendations
            const resultsHeading = document.getElementById('recommendation-heading');
            if (resultsHeading) {
                resultsHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    } else {
        alert("Please enter a keyword (e.g., beach, temple, Japan) to search.");
    }
});

// Task 9: Clear Button Handler
resetButton.addEventListener('click', () => {
    resetRecommendations();
});

function resetRecommendations() {
    searchInput.value = '';
    recHeading.classList.remove('hidden');
    // Initial prompt is displayed when results are reset
    resultsContainer.innerHTML = `<p style="text-align: center; width: 100%; font-size: 1.2em; color: #ddd;">
                                        Use the search bar above to find recommendations for **beaches**, **temples**, or **countries**!
                                      </p>`;
}


// Initial load: Display Home page content and initial prompt
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
    resetRecommendations();
});

