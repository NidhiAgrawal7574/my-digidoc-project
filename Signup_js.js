// script.js
document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault();

   const userInput = document.getElementById("userInput").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMsg = document.getElementById("errorMsg");
  errorMsg.textContent = "";
 if (!userInput) {
        errorMsg.textContent = "Please provide a valid input.";
        return;
    }
 if (password.length < 6) {
        errorMsg.textContent = "Password must be at least 6 characters.";
        return;
    }
  if (password !== confirmPassword) {
        errorMsg.textContent = "Passwords do not match.";
        return;
    }
alert("Sign Up Successful!");
    // Additional logic like sending data to a server can be added here
});
