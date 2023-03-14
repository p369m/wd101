const form = document.querySelector("#form");
const errorList = document.querySelector("#error-list");
const tableBody = document.querySelector("#table-body");

// Event listener for form submission
form.addEventListener("submit", (event) => {
  // Prevent the form from submitting
  event.preventDefault();

  // Clear the error list
  errorList.innerHTML = "";

  // Get the form data
  const name = form.elements.name.value.trim();
  const dob = form.elements.dob.value;
  const email = form.elements.email.value.trim();
  const password = form.elements.password.value.trim();
  const tnc = form.elements.tnc.checked;

  // Validate the form data
  let isValid = true;

  if (name === "") {
    errorList.innerHTML += "<li>Name is required</li>";
    isValid = false;
  }

  const age = getAge(dob);
  if (age < 15 || age > 55) {
    errorList.innerHTML += "<li>Date of birth must be between 15 and 55 years ago</li>";
    isValid = false;
  }

  if (email === "") {
    errorList.innerHTML += "<li>Email is required</li>";
    isValid = false;
  }

  if (password === "") {
    errorList.innerHTML += "<li>Password is required</li>";
    isValid = false;
  }

  if (!tnc) {
    errorList.innerHTML += "<li>You must accept the terms and conditions</li>";
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  // Add the user data to the table
  const row = tableBody.insertRow();

  const nameCell = row.insertCell();
  nameCell.innerHTML = name;

  const dobCell = row.insertCell();
  dobCell.innerHTML = dob;

  const emailCell = row.insertCell();
  emailCell.innerHTML = email;

  const passwordCell = row.insertCell();
  passwordCell.innerHTML = password;

  const tncCell = row.insertCell();
  tncCell.classList.add("true-false");
  tncCell.innerHTML = tnc ? "True" : "False";

  // Save the user data to local storage
  saveUserData({ name, dob, email, password, tnc });

  // Clear the form
  form.reset();
});

// Get the age of a person based on their date of birth
function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Save user data to local storage
function saveUserData(userData) {
  const userDataString = JSON.stringify(userData);
  localStorage.setItem("userData", userDataString);
}

// Load user data from local storage and display it in the table
function loadUserData() {
  const userDataString = localStorage.getItem("userData");
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    const row = tableBody.insertRow();

    const nameCell = row.insertCell();
    nameCell.innerHTML = userData.name;

    const dobCell = row.insertCell();
    dobCell.innerHTML = userData.dob;

    const emailCell = row.insertCell();
    emailCell.innerHTML = userData.email;

    const passwordCell = row.insertCell();
    passwordCell.innerHTML = userData.password;
    
    const tncCell = row.insertCell();
    tncCell.classList.add("true-false");
    tncCell.innerHTML = userData.tnc ? "True" : "False";
    }
    }
    
    // Load the user data when the page loads
    loadUserData();
