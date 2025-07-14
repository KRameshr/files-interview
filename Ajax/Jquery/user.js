export const fetchUserData = () => {
  $.get("https://dummyjson.com/users", (data, status) => {
    console.log(data);
    console.log(status);

    let userTable = `
 <table border ="1">
      <thead>
        <th>ID</th>

        <th>FullName</th>
        <th>Email</th>
        <th>Age</th>
        <th>Gender</th>
        <th>#</th>
      </thead>
    <tbody>

`;
    data.users.forEach((e) => {
      userTable += `
      <tr>
        <td>${e.id}</td>
        <td>${e.firstName} ${e.lastName}</td>
        <td>${e.email}</td>
        <td>${e.age}</td>
        <td>${e.gender}</td>
        <td>
        <button id ="${e.id}" class="btnDelete">Delete</button>
        <button>Edit</button>
        </td>
      </tr
     `;
    });
    userTable += `</tbody> </table>`;
    $(userTable).appendTo("#user-section");
    $(".btnDelete").click((event) => {
      console.log(event.target.id);
      deletUser(event.target.id);
    });
  }).fail(() => {
    alert("error");
  });
};

const deletUser = (userid) => {
  $.ajax({
    url: `https://dummyjson.com/users/${userid}`,
    methor: "delete",
    success: function (result) {
      console.log(result);
    },
    fail: function (error) {
      console.log(error);
    },
  });
};
