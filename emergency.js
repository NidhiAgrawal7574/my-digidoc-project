document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
    
    // First Aid Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const emergencyCards = document.querySelectorAll('.emergency-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter cards
            emergencyCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // First Aid Search
    const searchInput = document.getElementById('first-aid-search');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length > 0) {
            emergencyCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                if (cardText.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Reset filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-filter="all"]').classList.add('active');
        } else {
            // If search is empty, show all cards
            emergencyCards.forEach(card => card.style.display = 'block');
        }
    });
    
    // Hospital Finder
    const hospitalDatabase = {
        "New York": [
            {
                name: "Mount Sinai Hospital",
                address: "1468 Madison Ave, New York, NY 10029",
                phone: "(212) 241-6500",
                type: "hospital",
                distance: "2.3 miles"
            },
            {
                name: "NYU Langone Health",
                address: "550 1st Ave, New York, NY 10016",
                phone: "(212) 263-7300",
                type: "hospital",
                distance: "1.8 miles"
            },
            {
                name: "CityMD Urgent Care",
                address: "24 W 57th St, New York, NY 10019",
                phone: "(212) 315-2330",
                type: "urgent",
                distance: "0.8 miles"
            }
        ],
        "Los Angeles": [
            {
                name: "Cedars-Sinai Medical Center",
                address: "8700 Beverly Blvd, Los Angeles, CA 90048",
                phone: "(310) 423-3277",
                type: "hospital",
                distance: "3.1 miles"
            },
            {
                name: "UCLA Medical Center",
                address: "757 Westwood Plaza, Los Angeles, CA 90095",
                phone: "(310) 267-8000",
                type: "hospital",
                distance: "2.4 miles"
            }
        ],
        "Chicago": [
            {
                name: "Northwestern Memorial Hospital",
                address: "251 E Huron St, Chicago, IL 60611",
                phone: "(312) 926-2000",
                type: "hospital",
                distance: "1.5 miles"
            },
            {
                name: "University of Chicago Medical Center",
                address: "5841 S Maryland Ave, Chicago, IL 60637",
                phone: "(773) 702-1000",
                type: "hospital",
                distance: "4.2 miles"
            }
        ],
        "10001": [
            {
                name: "NYC Health + Hospitals/Bellevue",
                address: "462 First Avenue, New York, NY 10016",
                phone: "(212) 562-5555",
                type: "hospital",
                distance: "1.2 miles"
            },
            {
                name: "Mount Sinai Beth Israel",
                address: "10 Nathan D Perlman Pl, New York, NY 10003",
                phone: "(212) 420-2000",
                type: "hospital",
                distance: "2.1 miles"
            }
        ],
        "90210": [
            {
                name: "Cedars-Sinai Medical Center",
                address: "8700 Beverly Blvd, Los Angeles, CA 90048",
                phone: "(310) 423-3277",
                type: "hospital",
                distance: "1.7 miles"
            },
            {
                name: "Beverly Hills Urgent Care",
                address: "8950 Olympic Blvd, Beverly Hills, CA 90211",
                phone: "(310) 246-0995",
                type: "urgent",
                distance: "0.5 miles"
            }
        ]
    };
    
    // Find Hospitals Button Click
    const findHospitalsBtn = document.getElementById('find-hospitals-btn');
    const locationInput = document.getElementById('location-input');
    const facilityType = document.getElementById('facility-type');
    const resultsContainer = document.getElementById('hospital-results');
    
    findHospitalsBtn.addEventListener('click', function() {
        const location = locationInput.value.trim();
        const type = facilityType.value;
        
        if (location === '') {
            resultsContainer.innerHTML = '<div class="placeholder-message"><p>Please enter a location</p></div>';
            return;
        }
        
        // Check if location exists in our database
        const hospitals = hospitalDatabase[location];
        
        if (!hospitals) {
            resultsContainer.innerHTML = `
                <div class="placeholder-message">
                    <p>No results found for "${location}". Try a major city name or ZIP code.</p>
                </div>
            `;
            return;
        }
        
        // Filter by facility type if needed
        let filteredHospitals = hospitals;
        if (type !== 'all') {
            filteredHospitals = hospitals.filter(hospital => hospital.type === type);
        }
        
        if (filteredHospitals.length === 0) {
            resultsContainer.innerHTML = `
                <div class="placeholder-message">
                    <p>No ${type} facilities found in "${location}".</p>
                </div>
            `;
            return;
        }
        
        // Display results
        let resultsHTML = `<h3>Results for "${location}"</h3>`;
        
        filteredHospitals.forEach(hospital => {
            resultsHTML += `
                <div class="hospital-card">
                    <div class="hospital-name">${hospital.name}</div>
                    <div class="hospital-address">${hospital.address}</div>
                    <div class="hospital-contact">
                        <div class="hospital-phone">${hospital.phone}</div>
                        <div class="distance">${hospital.distance}</div>
                    </div>
                </div>
            `;
        });
        
        resultsContainer.innerHTML = resultsHTML;
    });
});