let save = () => {

    let name = document.getElementById('name').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let userContact = document.getElementById('userContact').value;
    let userCNIC = document.getElementById('userCNIC').value;
    let storeName = document.getElementById('storeName').value;
    let storeAddress = document.getElementById('storeAddress').value;
    let storeContact = document.getElementById('storeContact').value;
    let image = document.getElementById('storeLogo').files[0];

    if (name == "" || username == "" || password == "" || userContact == "" || userCNIC == "" || storeName == "" || storeAddress == "" || storeContact == "" || !image) {
        Swal.fire({
            icon: "error",
            title: "Please Enter Data",
        });
        return;
    } else {
        let formdata = new FormData();
        formdata.append('name', name);
        formdata.append('username', username);
        formdata.append('password', password);
        formdata.append('userContact', userContact);
        formdata.append('userCNIC', userCNIC);
        formdata.append('storeName', storeName);
        formdata.append('storeAddress', storeAddress);
        formdata.append('storeContact', storeContact);
        formdata.append('image', image);

        $.ajax({
            type: 'POST',
            url: './user.php',
            data: formdata,
            dataType: 'JSON',
            contentType: false,
            processData: false,
            success: function (data) {
                if (data == '200') {
                    Swal.fire({
                        title: "User Saved Successfully",
                        icon: "success",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                    
                } else {
                    console.log("Error___!!!");
                }
            }
        })
    };
}