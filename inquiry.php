<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name    = htmlspecialchars($_POST['name']);
    $email   = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Option 1: Save to a file (e.g., inquiries.txt)
    $file = fopen("inquiries.txt", "a");
    fwrite($file, "Name: $name\nEmail: $email\nSubject: $subject\nMessage: $message\n---\n");
    fclose($file);

    // Option 2 (commented): Save to database (requires DB setup)
    /*
    $conn = new mysqli("localhost", "username", "password", "database");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $stmt = $conn->prepare("INSERT INTO inquiries (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $subject, $message);
    $stmt->execute();
    $stmt->close();
    $conn->close();
    */

    // Show success HTML page
    echo "<!DOCTYPE html>
    <html lang='en'>
    <head>
      <meta charset='UTF-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
      <title>Success</title>
      <style>
        body { font-family: Arial; background: #e0f7fa; text-align: center; padding: 50px; }
        .message-box { background: #fff; padding: 30px; border-radius: 10px; display: inline-block; border: 2px solid #4fc3f7; }
        .message-box h2 { color: green; }
        .button { margin-top: 20px; padding: 10px 20px; background: #039be5; color: white; border: none; border-radius: 5px; text-decoration: none; }
        .button:hover { background: #0277bd; }
      </style>
    </head>
    <body>
      <div class='message-box'>
        <h2>Form Submitted Successfully!</h2>
        <p>Thank you, <strong>$name</strong>. We have received your inquiry.</p>
        <a href='inquiry.html' class='button'>Back to Form</a>
        <a href='view_inquiries.php' class='button'>View Inquiries</a>
      </div>
    </body>
    </html>";
}
?>
