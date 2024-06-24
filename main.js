var selectedRow = null;

// SHOW
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 1000);
}

// Clear all fields
function clearFields() {
  document.querySelector("#firstName").value = "";
  document.querySelector("#lastName").value = "";
  document.querySelector("#group").value = "";
}

// Add data
document.querySelector("#student-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const group = document.querySelector("#group").value;

  // Validation
  if (firstName == "" || lastName == "" || group == "") {
    showAlert("Please fill in all fields", "danger");
  } else {
    if (selectedRow === null) {
      const list = document.querySelector("#student-list");
      const row = document.createElement("tr");

      row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${group}</td>
            <td>
              <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
              <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            </td>
          `;

      list.appendChild(row);
      showAlert("Student Added", "success");
    } else {
      selectedRow.children[0].textContent = firstName;
      selectedRow.children[1].textContent = lastName;
      selectedRow.children[2].textContent = group;
      showAlert("Student Info Edited", "info");
    }
    clearFields();
    selectedRow = null;
  }
});

// Edit Data
document.querySelector("#student-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    selectedRow = e.target.parentElement.parentElement;
    document.querySelector("#firstName").value =
      selectedRow.children[0].textContent;
    document.querySelector("#lastName").value =
      selectedRow.children[1].textContent;
    document.querySelector("#group").value =
      selectedRow.children[2].textContent;
  }
});

// Delete Data
document.querySelector("#student-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
    showAlert("Student Data Deleted", "danger");
  }
});