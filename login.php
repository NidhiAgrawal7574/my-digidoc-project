<?php
// Database connection
$servername = "localhost"; // Or your server address
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "digidoc"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user inputs
$user = $_POST['username'];
$pass = $_POST['password'];
$phone = $_POST['phone-number'];

// Sanitize user inputs to prevent SQL injection
$user = $conn->real_escape_string($user);
$pass = $conn->real_escape_string($pass);
$phone = $conn->real_escape_string($phone);

// Check if the user exists in the database
$sql = "SELECT * FROM users WHERE username='$user' AND password='$pass' AND phone_number='$phone'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // If login is successful
    session_start();
    $_SESSION['username'] = $user; // Store username in session

    // Redirect to the main page
    header("Location: nidhi.html.html"); // Replace with your actual main page file
    exit(); // Stop further execution
} else {
    // If login fails
    $message = "Invalid username, password, or phone number!";
    echo "<script>alert('$message'); window.location.href = 'login.html';</script>";
}

$conn->close();
?>
