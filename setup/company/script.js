document.getElementById("store_name").innerHTML = localStorage.store_name;

let save = () => {

    let companyName = document.getElementById('name').value;
    let companyEmail = document.getElementById('email').value;
    let companyCode = document.getElementById('code').value;
    let companyWebsite = document.getElementById('website').value;
    let companyContact = document.getElementById('contact').value;
    let companyAddress = document.getElementById('address').value;
    let userContact = localStorage.Contact;

    if (companyName == '' || companyEmail == '' || companyCode == '' || companyWebsite == '' || companyContact == '' || companyAddress == '') {
        Swal.fire({
            icon: "error",
            title: "Please Enter Data",
        });
    } else if (companyEmail.indexOf('@') === -1) {
        Swal.fire({
            icon: "error",
            title: "Please Enter Valid Email",
        });
    } else if (companyWebsite.indexOf('.com') === -1) {
        Swal.fire({
            icon: "error",
            title: "Please Enter Valid Website",
        });
    } else {
        $.ajax({
            type: 'POST',
            url: './save.php',
            data: {
                companyName: companyName,
                companyEmail: companyEmail,
                companyCode: companyCode,
                companyWebsite: companyWebsite,
                companyContact: companyContact,
                companyAddress: companyAddress,
                userContact: userContact
            },
            dataType: 'JSON',
            success: function (data) {
                if (data == '200') {
                    Swal.fire({
                        title: "Company Saved Successful",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 700
                    });
                    show();
                    reset();
                } else {
                    alert('Data Not Saved___!!!');
                }
            }

        })
    };
}

let reset = () => {
    $('#name').val('');
    $('#code').val('');
    $('#contact').val('');
    $('#email').val('');
    $('#website').val('');
    $('#address').val('');
};


let show = () => {
    let tbody = document.querySelector('tbody');
    $(tbody).empty();
    let userContact = localStorage.Contact;

    $.ajax({
        type: 'POST',
        url: './show.php',
        data: {
            userContact: userContact
        },
        dataType: 'JSON',
        success: function (data) {
            if (data.length === 0) {
                tbody.innerHTML = `<tr><td colspan="8" style="color: red; font-size: 30px;">No Company!</td></tr>`;
            } else {
                let i = 1;
                data.forEach(object => {
                    tbody.innerHTML += `
                            <tr id="row_${object.id}">
                                <td>${i}</td>
                                <td>${object.company_name}</td>
                                <td>${object.company_email}</td>
                                <td>${object.company_code}</td>
                                <td>${object.company_website}</td>
                                <td>${object.company_contact}</td>
                                <td>${object.company_address}</td>
                                <td><button class="btn-danger btn" onclick="deleteRow(${object.id})"><img src="./delete.png" height="20px"></button></td>
                            </tr>
                            `;
                    i++;
                });
            }
        }
    });
};

show();

let deleteRow = (id) => {
    let userContact = localStorage.Contact;
    $.ajax({
        type: 'POST',
        url: './delete.php',
        data: {
            id: id,
            userContact: userContact
        },
        dataType: 'JSON',
        success: function (data) {
            if (data == '200') {
                let deletedRow = document.getElementById(`row_${id}`);
                deletedRow.remove();
                Swal.fire({
                    icon: "success",
                    text: "Company deleted successfully!",
                });
            } else {
                console.log("Error___!!!");
            }
        },
    })
}

let Exit = () => {
    Swal.fire({
        title: "Are You Sure You Want To Log Out?",
        text: "If You Log Out Than You Have To Login Again ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log Out"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            location.href = "../../login/index.html";
        }
    });
};
