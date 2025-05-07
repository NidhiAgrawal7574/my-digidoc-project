// updated_index_script.js

document.addEventListener('DOMContentLoaded', function() {
    // Handle search functionality
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');

    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Searching for: ${query}`);
            // Add actual search functionality here
        } else {
            alert('Please enter a search term!');
        }
    });

    // Also allow search on Enter key press
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    // Add interactivity to service cards
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            switch (index) {
                case 0:
                    window.location.href = 'symptom_checker.html';
                    break;
                case 1:
                    window.location.href = 'appt_scheduling.html';
                    break;
                case 2:
                    window.location.href = 'emergency.html';
                    break;
                default:
                    console.log('Unknown service selected!');
            }
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process if it's an in-page anchor
            if (href.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add visual feedback on buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});