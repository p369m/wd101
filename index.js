document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const tableBody = document.getElementById("table-body");

  // Function to load entries from localStorage and populate the table
  const loadEntries = () => {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    tableBody.innerHTML = entries
      .map(
        (entry) => `
        <tr>
          <td>${entry.name}</td>
          <td>${entry.email}</td>
          <td>${entry.password}</td>
          <td>${entry.dob}</td>
          <td>${entry.terms ? "true" : "false"}</td>
        </tr>
      `
      )
      .join("");
  };

  // Function to format date to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to add a new entry to localStorage and update the table
  const addEntry = (entry) => {
    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));
    loadEntries(); // Update the table after adding the entry
  };

  // Form submission handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const dobInput = document.getElementById("dob").value;
    const dob = new Date(dobInput);
    const terms = document.getElementById("terms-checkbox").checked;

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Invalid email address.");
      return;
    }

    // Validate age (18-55)
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
      age--;
    }
    if (age < 18 || age > 55) {
      alert("You must be between 18 and 55 years old.");
      return;
    }

    // Create an entry object with formatted DOB
    const entry = {
      name,
      email,
      password,
      dob: formatDate(dob),
      terms,
    };

    // Add the new entry
    addEntry(entry);
    form.reset(); // Clear the form fields
  });

  // Initial load of entries
  loadEntries();
});
