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
        "390001": [
            {
                name: "S.G. Hospital",
        address: "Lalbaug Road, Manjalpur, Vadodara, Gujarat 390001",
        phone: "0265 232 5555",
        type: "hospital",
        distance: "1.1 km"
    },
    {
        name: "Sterling Hospital",
        address: "Race Course Circle, Vadodara, Gujarat 390001",
        phone: "0265 222 4200",
        type: "hospital",
        distance: "2.3 km"
            }
        ],
        "390007": [
    {
        name: "Bhailal Amin General Hospital",
        address: "Gorwa Road, Vadodara, Gujarat 390007",
        phone: "0265 228 6666",
        type: "hospital",
        distance: "1.5 km"
    },
    {
        name: "Revive Hospital",
        address: "Gorwa Refinery Road, Vadodara, Gujarat 390007",
        phone: "0265 298 1122",
        type: "urgent",
        distance: "0.9 km"
    }
],
"Alkapuri": [
    {
        name: "Unity Hospital",
        address: "Alkapuri, RC Dutt Road, Vadodara, Gujarat",
        phone: "0265 233 0333",
        type: "hospital",
        distance: "1.2 km"
    },
    {
        name: "Baroda Heart Institute",
        address: "RC Dutt Road, Alkapuri, Vadodara, Gujarat",
        phone: "0265 235 5511",
        type: "speciality",
        distance: "0.8 km"
    }
],
"Manjalpur": [
    {
        name: "Parul Sevashram Hospital",
        address: "Manjalpur, Vadodara, Gujarat",
        phone: "0265 656 0101",
        type: "hospital",
        distance: "1.9 km"
    },
    {
        name: "Spandan Multi Speciality Hospital",
        address: "Manjalpur Main Road, Vadodara, Gujarat",
        phone: "0265 265 0660",
        type: "urgent",
        distance: "1.4 km"
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