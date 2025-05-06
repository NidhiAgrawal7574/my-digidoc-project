
document.addEventListener('DOMContentLoaded', function() {
    // Doctor data - in a real app this would come from your database
    const doctors = {
        cardiology: [
            {id: 'c1', name: 'Dr. Emily Johnson'},
            {id: 'c2', name: 'Dr. Michael Chen'}
        ],
        neurology: [
            {id: 'n1', name: 'Dr. Sarah Williams'},
            {id: 'n2', name: 'Dr. Robert Lee'}
        ],
        orthopedics: [
            {id: 'o1', name: 'Dr. James Smith'},
            {id: 'o2', name: 'Dr. Lisa Rodriguez'}
        ],
        pediatrics: [
            {id: 'p1', name: 'Dr. Maria Garcia'},
            {id: 'p2', name: 'Dr. David Kim'}
        ],
        dermatology: [
            {id: 'd1', name: 'Dr. Jessica Brown'},
            {id: 'd2', name: 'Dr. John Taylor'}
        ],
        general: [
            {id: 'g1', name: 'Dr. Thomas Wilson'},
            {id: 'g2', name: 'Dr. Elizabeth Martinez'}
        ]
    };
    
    // Update doctors dropdown when department changes
    const departmentSelect = document.getElementById('department');
    const doctorSelect = document.getElementById('doctor');
    
    departmentSelect.addEventListener('change', function() {
        const department = this.value;
        doctorSelect.innerHTML = '<option value="">Select a Doctor</option>';
        
        if (department && doctors[department]) {
            doctors[department].forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor.id;
                option.textContent = doctor.name;
                doctorSelect.appendChild(option);
            });
        }
    });
    
    // Set minimum date to today
    const appointmentDateInput = document.getElementById('appointmentDate');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    appointmentDateInput.min = `${yyyy}-${mm}-${dd}`;
    
    // Handle form submission
    const appointmentForm = document.getElementById('appointmentForm');
    const confirmationDiv = document.getElementById('appointmentConfirmation');
    const detailsDiv = document.getElementById('appointmentDetails');
    
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('patientName').value;
        const email = document.getElementById('patientEmail').value;
        const phone = document.getElementById('patientPhone').value;
        const departmentValue = departmentSelect.value;
        const departmentText = departmentSelect.options[departmentSelect.selectedIndex].text;
        const doctorText = doctorSelect.options[doctorSelect.selectedIndex].text;
        const date = document.getElementById('appointmentDate').value;
        const timeValue = document.getElementById('appointmentTime').value;
        const timeText = document.getElementById('appointmentTime').options[document.getElementById('appointmentTime').selectedIndex].text;
        const reason = document.getElementById('reason').value;
        
        // Format date for display
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Display confirmation with appointment details
        detailsDiv.innerHTML = `
            <div class="appointment-summary">
                <p><strong>Patient:</strong> ${name}</p>
                <p><strong>Department:</strong> ${departmentText}</p>
                <p><strong>Doctor:</strong> ${doctorText}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${timeText}</p>
            </div>
        `;
        
        // Show confirmation message
        appointmentForm.style.display = 'none';
        confirmationDiv.style.display = 'block';
        
        // In a real app, you would send this data to your server/database
        console.log('Appointment booked:', {
            name,
            email,
            phone,
            department: departmentValue,
            doctor: doctorSelect.value,
            date,
            time: timeValue,
            reason
        });
        
        // Simulate an API call (remove in production)
        setTimeout(() => {
            // For demo purposes only - in a real app you wouldn't reset the form here
            // appointmentForm.reset();
            // appointmentForm.style.display = 'block';
            // confirmationDiv.style.display = 'none';
        }, 10000);
        
        document.querySelectorAll('input[name="appointmentType"]').forEach(radio => {
            radio.addEventListener('change', function() {
                const platformGroup = document.getElementById('onlinePlatformGroup');
                if (this.value === 'online') {
                    platformGroup.style.display = 'block';
                } else {
                    platformGroup.style.display = 'none';
                }
            });
        });
    });
});

