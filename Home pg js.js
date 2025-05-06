// script.js

// Handle "GET STARTED" button click
document.querySelector('.cta').addEventListener('click', () => {
    alert('Redirecting to the main services page...');
    // You can add actual redirection logic here:
    // window.location.href = "services.html";
});

// Add interactivity to the search bar
const searchInput = document.querySelector('.search input');;
const searchButton = document.querySelector('.search button');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        alert(`Searching for: ${query}`);
        // Add actual search functionality here
    } else {
        alert('Please enter a search term!');
    }
});

// Simulate functionality for service cards
const serviceCards = document.querySelectorAll('.service-cards .card');

serviceCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        switch (index) {
            case 0:
                alert('Opening Symptom Checker...');
                // Add redirection logic here
                break;
            case 1:
                alert('Connecting to Online Consultations...');
                // Add redirection logic here
                break;
            case 2:
                alert('Accessing Medical Records...');
                // Add redirection logic here
                break;
            default:
                alert('Unknown service selected!');
        }
    });
});

// Display social media hover effect
const socialIcons = document.querySelectorAll('.social-icons a');

socialIcons.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.color = '#03A678';  Change icon color on hover
    });

    icon.addEventListener('mouseout', () => {
        icon.style.color = '#FFFFFF'; // Reset icon color
    });
});
