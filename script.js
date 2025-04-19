// Add event listener for form submission
document.getElementById('inquiryForm').addEventListener('submit', function(event) {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const formMessage = document.getElementById('formMessage');

  let isValid = true;

  // Clear previous messages
  formMessage.textContent = '';
  formMessage.classList.remove('error');

  // Validate Name
  if (!name) {
    isValid = false;
    formMessage.textContent = 'Please enter your name.';
    formMessage.classList.add('error');
  }

  // Validate Email
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    isValid = false;
    formMessage.textContent = 'Please enter a valid email address.';
    formMessage.classList.add('error');
  }

  // Validate Subject
  if (!subject) {
    isValid = false;
    formMessage.textContent = 'Please enter a subject.';
    formMessage.classList.add('error');
  }

  // Validate Message
  if (!message) {
    isValid = false;
    formMessage.textContent = 'Please enter a message.';
    formMessage.classList.add('error');
  }

  // Prevent submission if validation fails
  if (!isValid) {
    event.preventDefault();
  }
});
