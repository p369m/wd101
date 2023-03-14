const form = document.querySelector("#form");
const errorList = document.querySelector("#error-list");
const tableBody = document.querySelector("#table-body");
//from wd

function displayTable();
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
//display table
function displayTable(){
  let table = element("table-body");
  let entries = userDataString;
  let str = `<tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Dob</th>
                  <th>Accepted terms?</th>
              </tr>\n`;
  for(let i=0;i<entries.length;i++){
      str += `<tr>
                  <td>${entries[i].name}</td>
                  <td>${entries[i].email}</td>
                  <td>${entries[i].password}</td>
                  <td>${entries[i].dob}</td>
                  <td>${entries[i].checked}</td>
              </tr>\n`;
  }
  table.innerHTML = str;
}


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
  let userDataString = localStorage.getItem("userDataString");
  let user_DataString = [];

  if (userDataString) {
    user_DataString = JSON.parse(userDataString);
  }

  user_DataString.push(userData);
  localStorage.setItem("userDataString", JSON.stringify(user_DataString));
}

// Load user data from local storage and display it in the table
function loadUserData() {
  const user_DataString = localStorage.getItem("userData");
  
  if (user_DataString) {
    const userData = JSON.parse(user_DataString);
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
    loadUserData();
    }
    }
    
    // Load the user data when the page loads
    loadUserData();
    // Retrieve the string from localStorage.
// Retrieve the string from localStorage.

