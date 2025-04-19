// JavaScript for Login Page Functionality
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
    const identifier = document.getElementById('first').value;
    const password = document.getElementById('password').value;

    if (identifier.trim() === "" || password.trim() === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Simulate a login request
    console.log("Login Attempt:", {
        identifier: identifier,
        password: password
    });
    alert("Login successful (simulation). Redirecting...");
    // Add logic to handle actual login or redirection here
});

document.getElementById('forgot-password').addEventListener('click', function () {
    alert("Forgot Password functionality is not implemented yet.");
    // Add logic to handle password recovery here
});
