// DOM elements
const title = document.querySelector('#title');
const regForm = document.querySelector('.regForm');
const usernameReg = document.getElementById('usernameReg');
const passwordReg = document.getElementById('passwordReg');
const logForm = document.querySelector('.logForm');
const username = document.getElementById('username');
const password = document.getElementById('password');

// Data
const usernameAndPasswords = {};

// Utility function to check if a username already exists
function checkIfUserExists(username, usernameAndPasswords) {
  return usernameAndPasswords.hasOwnProperty(username);
}

// Utility function to validate username and passwords
function validateUserNameAndPassword(username, password, usernameAndPasswords) {
  return (
    usernameAndPasswords.hasOwnProperty(username) &&
    usernameAndPasswords[username] === password
  );
}

// Event listener for registration form submission
regForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Validate form fields
  if (usernameReg.value.length === 0 || passwordReg.value.length === 0) {
    alert('Fill out all the forms first');
  } else if (
    passwordReg.value.length < 8 ||
    /^\d+$/.test(passwordReg.value) ||
    !/[a-z]/.test(passwordReg.value) ||
    !/[A-Z]/.test(passwordReg.value)
  ) {
    alert(
      'Password must be at least 8 characters long and include uppercase and lowercase letters.'
    );
    passwordReg.value = '';
  } else {
    // Store username and password
    if (checkIfUserExists(usernameReg.value, usernameAndPasswords)) {
      alert('Username is already taken');
    } else {
      usernameAndPasswords[usernameReg.value] = passwordReg.value;
      console.log(usernameAndPasswords);

      // Switch to login form
      logForm.style.display = 'block';
      regForm.style.display = 'none';
    }
  }
});

// Event listener for login form submission
logForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Validate username and password
  if (validateUserNameAndPassword(username.value, password.value, usernameAndPasswords)) {
    // Hide forms and display greeting
    logForm.style.display = 'none';
    title.style.display = 'none';
    document.querySelector('.welcomePanel #greeting').innerHTML =
      'Good day! ' + username.value + ". It's currently " + new Date().toLocaleString();
  } else {
    // Invalid login
    alert("Username and password don't exist");
  }
});
