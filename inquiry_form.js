document.getElementById("inquiryForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent real submission for demo

  // Show success message
  const msg = document.getElementById("successMessage");
  msg.textContent = "Form submitted successfully!";

  // Optionally reset form
  this.reset();

  // Optionally hide message after a few seconds
  setTimeout(() => {
    msg.textContent = "";
  }, 4000);

  // If you're using PHP, remove the e.preventDefault() and let the form submit normally.
});
