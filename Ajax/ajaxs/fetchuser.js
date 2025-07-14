let users = [];

const userForm = document.querySelector("#user-form");
const inputId = document.querySelector("#input-id");
const inputFirstName = document.querySelector("#input-first-name");
const inputLastName = document.querySelector("#input-last-name");
const inputEmail = document.querySelector("#input-email");
const inputGender = document.querySelector("#input-gender");
const inputAge = document.querySelector("#input-age");

export const fetchUserData = () => {
  const dataPara = document.querySelector("#data");

  fetch("https://dummyjson.com/user")
    .then((response) => response.json())
    .then((data) => {
      dataPara.innerText = "Total : " + data.total;

      // const userTable = document.createElement('table');

      users = data.users;
      populateTable();
    });
};

const populateTable = () => {
  const userTable = document.querySelector("#user-table");

  const existingTableBody = userTable.querySelector("tbody");
  userTable.removeChild(existingTableBody);

  const tableBody = document.createElement("tbody");

  users.forEach((userElement) => {
    const userRow = document.createElement("tr");

    const idColumn = document.createElement("td");
    idColumn.innerText = userElement.id;

    const firstNameColumn = document.createElement("td");
    firstNameColumn.innerText = userElement.firstName;

    const lastNameColumn = document.createElement("td");
    lastNameColumn.innerText = userElement.lastName;

    const emailColumn = document.createElement("td");
    emailColumn.innerText = userElement.email;

    const genderColumn = document.createElement("td");
    genderColumn.innerText = userElement.gender;

    const ageColumn = document.createElement("td");
    ageColumn.innerText = userElement.age;

    const deleteColumn = document.createElement("td");

    const deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", () => deleteUser(userElement));
    deleteButton.innerText = "Delete";
    deleteColumn.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.addEventListener("click", () => editUser(userElement));
    editButton.innerText = "Edit";
    deleteColumn.appendChild(editButton);

    userRow.appendChild(idColumn);
    userRow.appendChild(firstNameColumn);
    userRow.appendChild(lastNameColumn);
    userRow.appendChild(emailColumn);
    userRow.appendChild(genderColumn);
    userRow.appendChild(ageColumn);
    userRow.appendChild(deleteColumn);

    tableBody.appendChild(userRow);

    // table -> row -> columne
  });

  userTable.appendChild(tableBody);
};

const deleteUser = async (userElement) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/users/${userElement.id}`,
      {
        method: "DELETE",
      }
    );
    console.log(response.status);
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      users = users.filter((theUser) => theUser.id !== data.id);
      populateTable();
      alert(`${data.firstName} ${data.lastName} deleted successfully.`);
    } else {
      alert(`${data.firstName} ${data.lastName} not deleted.`);
    }
  } catch (error) {
    console.log(error);
  }
};

//

//

const editUser = (userElement) => {
  userForm.style.contentVisibility = "visible";
  inputId.value = userElement.id;
  inputId.setAttribute("disabled", true);

  inputFirstName.value = userElement.firstName;
  inputLastName.value = userElement.lastName;
  inputEmail.value = userElement.email;
  inputAge.value = userElement.age;
  inputGender.value = userElement.gender;
};

export const updateUserData = async () => {
  const userId = inputId.value;
  const firstName = inputFirstName.value;
  const lastName = inputLastName.value;
  const email = inputEmail.value;
  const gender = inputGender.value;
  const age = inputAge.value;

  try {
    const response = await fetch(`https://dummyjson.com/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        gender,
        age,
      }),
    });
    console.log(response.status);
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);

      const start = users.findIndex((theUser) => theUser.id === data.id);
      const deleteCount = 1;
      users.splice(start, deleteCount, data);

      populateTable();

      inputId.value = "";
      inputFirstName.value = "";
      inputLastName.value = "";
      inputEmail.value = "";
      inputGender.value = "";
      inputAge.value = "";
      userForm.style.contentVisibility = "hidden";

      alert(`${data.firstName} ${data.lastName} updated successfully.`);
    }
  } catch (error) {
    console.log(error);
  }
};
