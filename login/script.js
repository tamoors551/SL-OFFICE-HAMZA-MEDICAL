function login() {
    let name = document.getElementById('name').value;
    let pass = document.getElementById('pass').value;

    if (name == "") {
        Swal.fire("Please Enter Username");
        return;
    }
    if (pass == "") {
        Swal.fire("Please Enter Password");
        return;
    }

    $.ajax({
        type: 'POST',
        url: 'login.php',
        data: {
            name: name,
            pass: pass
        },
        dataType: 'JSON',
        success: function (loginData) {
            if (loginData === 'Invalid') {
                Swal.fire("Invalid Username or Password");
            } else if (loginData === 'Error') {
                Swal.fire("An error occurred while logging in");
            } else {
                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 700
                }).then((result) => {
                        localStorage.setItem('Contact', loginData.contact);
                        localStorage.setItem('store_name', loginData.store_name);
                        localStorage.setItem('store_address', loginData.store_address);
                        localStorage.setItem('store_contact', loginData.store_contact);
                        localStorage.setItem('logo', loginData.logo);

                        fetchItems(loginData.contact);
                });
            }
        }
    });
}

function fetchItems(userContact) {
    $.ajax({
        type: 'POST',
        url: 'getItem.php',
        data: {
            userContact: userContact,
        },
        dataType: 'JSON',
        success: function (itemData) {
            let savedData = [];

            itemData.forEach(object => {
                let Data = {
                    item_id: object.id,
                    item_name: object.name,
                    item_company: object.company,
                    item_expiry: object.expiry,
                    item_price: object.item_price,
                    packing: object.packing,
                };
                savedData.push(Data);
            });

            localStorage.setItem('purchase_table', JSON.stringify(savedData));

            // Redirect to dashboard page
            window.location.href = '../dashboard/index.html';
        }
    });
}
