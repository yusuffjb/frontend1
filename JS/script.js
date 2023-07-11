document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("modal");
    const closeBtn = document.getElementsByClassName("close-button")[0];
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    fetch("data/data.json")
        .then(response => response.json())
        .then(data => {
            const userTable = document.getElementById("user-table");
            const tbody = userTable.getElementsByTagName("tbody")[0];
            data.forEach(user => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.type}</td>
                    <td>${user.lastAccessedTime}</td>
                    <td><button class="view-button">View</button></td>
                `;
                const viewButton = row.querySelector(".view-button");
                viewButton.addEventListener("click", function () {
                    modal.style.display = "block";
                    const userDetails = {
                        name: user.name,
                        id: user.id,
                        type: user.type,
                        createdBy: user.createdBy,
                        lastAccessedTime: user.lastAccessedTime,
                        contactNo: user.contactNo,
                        emailId: user.emailId
                    };
                    const userDetailDiv = document.getElementById("user-details");
                    userDetailDiv.innerHTML = `
                        <p><strong>User Name:</strong> ${userDetails.name}</p>
                        <p><strong>User ID:</strong> ${userDetails.id}</p>
                        <p><strong>User Type:</strong> ${userDetails.type}</p>
                        <p><strong>Created by:</strong> ${userDetails.createdBy}</p>
                        <p><strong>Last Accessed Time:</strong> ${userDetails.lastAccessedTime}</p>
                        <p><strong>Contact No:</strong> ${userDetails.contactNo}</p>
                        <p><strong>Email Id:</strong> ${userDetails.emailId}</p>
                    `;
                });

            });
        })
        .catch(error => {
            console.error("Error fetching user details:", error);
        });
});