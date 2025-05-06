<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "nidhi";
$dbname = "digidoc";
$port="3307";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname , $port);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form data is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars(trim($_POST['username']));
    $email = htmlspecialchars(trim($_POST['email']));
    $password = password_hash(trim($_POST['password']), PASSWORD_DEFAULT); // Securely hash password
    $phone = htmlspecialchars(trim($_POST['phone-number']));
    

    // Ensure all fields are filled
    if (empty($username) || empty($email) || empty($password) || empty($phone)) {
        die("All fields are required.");
    }

    // Check for duplicate email
    $checkEmail = $conn->prepare("SELECT email FROM signup WHERE email = ?");
    $checkEmail->bind_param("s", $email);
    $checkEmail->execute();
    $checkEmail->store_result();

    if ($checkEmail->num_rows > 0) {
        die("Email already exists. Please use a different email.");
    }
    $checkEmail->close();

    // Insert new user into the database
    $sql = "INSERT INTO signup (username, email, password, phone_number) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $username, $email, $password, $phone);

    if ($stmt->execute()) {
        echo "<script>alert('Account created successfully!'); window.location.href = 'Login html.html';</script>";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}
