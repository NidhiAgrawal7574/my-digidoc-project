<?php
// Show all PHP errors for debugging purposes
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "nidhi"; // Database password
$dbname = "digidoc"; // Database name
$port = 3307; // MySQL port

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user inputs from the login form
$user = $_POST['username'];
$pass = $_POST['password'];
$phone = $_POST['phone-number'];

// Sanitize user inputs to prevent SQL injection
$user = $conn->real_escape_string($user);
$phone = $conn->real_escape_string($phone);

// Query to fetch user data
$sql = "SELECT * FROM signup WHERE username='$user' AND phone_number='$phone'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    // User found, fetch data
    $row = $result->fetch_assoc();
    $stored_password = $row['password']; // Stored hashed password

    // Verify the password using password_verify function
    if (password_verify($pass, $stored_password)) {
        // Login success, start session
        session_start();
        $_SESSION['username'] = $user; // Store the username in the session

        // Redirect to main page
        header("Location: index.html");
        exit();
    } else {
        // Invalid password
        echo "<script>alert('Invalid password!'); window.location.href = 'index.html';</script>";
    }
} else {
    // Invalid username or phone number
    echo "<script>alert('Invalid username or phone number!'); window.location.href = 'index.html';</script>";
}

$conn->close();
?>
