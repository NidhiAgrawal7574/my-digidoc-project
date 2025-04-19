<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Basic validation
    if (!empty($name) && !empty($email) && !empty($subject) && !empty($message)) {
        // Email content
        $to = "nidhiagrawal7574@gmail.com"; // Replace with your email address
        $headers = "From: $email\r\nReply-To: $email\r\n";
        $body = "Name: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message";

        // Send email
        if (mail($to, $subject, $body, $headers)) {
            echo "Your inquiry has been sent successfully.";
        } else {
            echo "Sorry, there was an error sending your message. Please try again.";
        }
    } else {
        echo "Please fill in all the fields.";
    }
} else {
    echo "Invalid request.";
}
?>
