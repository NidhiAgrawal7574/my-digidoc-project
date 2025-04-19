// script.js

// Example list of doctors
const doctors = [
    {
        name: "Dr. Aman",
        specialty: "Cardiologist",
        rating: 4.9,
        consultationFee: 500,
        image: "doctorimg.jpg",
        location: "New York",
    },
    {
        name: "Dr. Chintan",
        specialty: "Dermatologist",
        rating: 4.8,
        consultationFee: 400,
        image: "doctorimg.jpg",
        location: "Los Angeles",
    },
    {
        name: "Dr. Darshan",
        specialty: "Pediatrician",
        rating: 4.7,
        consultationFee: 450,
        image: "doctorimg.jpg",
        location: "Chicago",
    },
    {
        name: "Dr. Ekamjyot",
        specialty: "General Physician",
        rating: 4.6,
        consultationFee: 300,
        image: "doctorimg.jpg",
        location: "Houston",
    },
    {
        name: "Dr. faizal",
        specialty: "Cardiologist",
        rating: 4.9,
        consultationFee: 500,
        image: "doctorimg.jpg",
        location: "New York",
    },
    {
        name: "Dr. Gagan",
        specialty: "Dermatologist",
        rating: 4.8,
        consultationFee: 400,
        image: "doctorimg.jpg",
        location: "Los Angeles",
    },
    {
        name: "Dr. Harish",
        specialty: "Pediatrician",
        rating: 4.7,
        consultationFee: 450,
        image: "doctorimg.jpg",
        location: "Chicago",
    },
    {
        name: "Dr. Imran",
        specialty: "General Physician",
        rating: 4.6,
        consultationFee: 300,
        image: "doctorimg.jpg",
        location: "Houston",
    },
    {
        name: "Dr. Jagan",
        specialty: "Cardiologist",
        rating: 4.9,
        consultationFee: 500,
        image: "doctorimg.jpg",
        location: "New York",
    },
    {
        name: "Dr. Kartik",
        specialty: "Dermatologist",
        rating: 4.8,
        consultationFee: 400,
        image: "doctorimg.jpg",
        location: "Los Angeles",
    },
    {
        name: "Dr. Lakshay",
        specialty: "Pediatrician",
        rating: 4.7,
        consultationFee: 450,
        image: "doctorimg.jpg",
        location: "Chicago",
    },
    {
        name: "Dr. Mangesh",
        specialty: "General Physician",
        rating: 4.6,
        consultationFee: 300,
        image: "doctorimg.jpg",
        location: "Houston",
    },
];

// Function to populate doctor list
function populateDoctorList() {
    const doctorList = document.getElementById("doctor-list");

    // Clear current content
    doctorList.innerHTML = "";

    // Loop through doctors array and create doctor cards
    doctors.forEach((doctor) => {
        const doctorCard = `
            <div class="doctor-card">
                <img src="${doctor.image}" alt="${doctor.name}">
                <h3>${doctor.name}</h3>
                <p><strong>Specialty:</strong> ${doctor.specialty}</p>
                <p><strong>Rating:</strong> ⭐${doctor.rating}</p>
                <p><strong>Location:</strong> ${doctor.location}</p>
                <p class="charges">Rs.${doctor.consultationFee} per session</p>
                <button onclick="startVideoCall('${doctor.name}')">Start Video Call</button>
            </div>
        `;
        doctorList.innerHTML += doctorCard;
    });
}

// Function to initiate video call
function startVideoCall(doctorName) {
    alert(`Initiating video call with ${doctorName}.`);
    // Here, you can redirect to a video consultation platform or integrate WebRTC APIs.
}

// Populate the doctor list when the page loads
document.addEventListener("DOMContentLoaded", populateDoctorList);
