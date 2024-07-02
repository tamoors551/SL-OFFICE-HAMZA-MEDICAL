document.getElementById("store_name").innerHTML = localStorage.store_name;

let showCompany = () => {

    let userContact = localStorage.Contact;
    let options = document.querySelector('#options');

    $.ajax({
        type: 'POST',
        url: './company.php',
        data: {
            userContact: userContact,
        },
        dataType: 'JSON',
        success: function (data) {
            if (data == '420') {
                console.log("Error occurred in fetching company data");
                return;
            } else {
                options.innerHTML = "";
                data.forEach(option => {
                    options.innerHTML += `
                        <option value='${option.company_name}'>${option.company_name}</option>
                        `;
                });
            }
        }
    });
};
showCompany();

let openFileInput = () => {
    document.getElementById('fileInput').click();
};
let reset = () => {
    $('#code').val('');
    $('#name').val('');
    $('#barcode').val('');
    $('#unit').val('');
    $('#remarks').val('');
    $('#pieces').val('Pieces');
    $('#imagePreview').attr('src', './file.png'); // Replace 'default-image-url.png' with the URL of your default image
};


let save = () => {

    let company = document.getElementById('options').value;
    let name = document.getElementById('name').value;
    let barcode = document.getElementById('barcode').value;
    let unit = document.getElementById('unit').value;
    let pieces = document.getElementById('pieces').value;
    let remarks = document.getElementById('remarks').value;
    let image = document.getElementById('fileInput').files[0];
    let Contact = localStorage.Contact;

    if (name == "" || barcode == "" || unit == "" || pieces == "" || remarks == "" || !image) {
        Swal.fire({
            icon: "error",
            title: "Please Enter Data",
        });
        return;
    } else {

        let formdata = new FormData();
        formdata.append('company', company);
        formdata.append('name', name);
        formdata.append('barcode', barcode);
        formdata.append('unit', unit);
        formdata.append('pieces', pieces);
        formdata.append('remarks', remarks);
        formdata.append('image', image);
        formdata.append('Contact', Contact);

        $.ajax({
            type: 'POST',
            url: './product.php',
            data: formdata,
            dataType: 'JSON',
            contentType: false,
            processData: false,
            success: function (data) {
                if (data == '200') {
                    Swal.fire({
                        title: "Produce Saved Successful",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 700
                    });
                    $('#uploadContent').trigger('reset');
                    reset();
                    product();
                } else {
                    console.log("Error___!!!");
                }
            }
        })
    };

}
let product = () => {
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = "";
    let userContact = localStorage.Contact;

    $.ajax({
        type: 'POST',
        url: './show.php',
        data: {
            userContact: userContact,
        },
        dataType: 'JSON',
        success: function (data) {
            let i = 1;
            if (data == '420') {
                console.log("Error occurred in fetching Product data");
                return;
            } else {
                if (data.length === 0) {
                    tbody.innerHTML = `<tr><td colspan="10" style="color: red; font-size : 25px;">No Product !</td></tr>`;
                } else {
                    data.forEach(object => {
                        tbody.innerHTML += `
                            <tr id="row_${object.id}">
                                <td>${i}</td>
                                <td>${object.name}</td>
                                <td>${object.company_name}</td>
                                <td>${object.bcode}</td>
                                <td>1 x ${object.unit}</td>
                                <td>${object.pieces}</td>
                                <td>${object.rema}</td>
                                <td><img src="../uploads/${object.imge}" width="100px"></td>
                                <td><button class="btn btn-danger delete" onclick="deleteRow(${object.id})"><img src="../company/delete.png" height="20px"></button></td>
                            </tr>
                         `;
                        i++;
                    });
                }
            }
        }
    });
};

product();


let deleteRow = (id) => {
    let Contact = localStorage.Contact;
    $.ajax({
        type: 'POST',
        url: './delete.php',
        data: { id: id, Contact: Contact },
        dataType: 'JSON',
        success: function (data) {
            if (data.status === 'success') {
                let deletedRow = document.getElementById(`row_${id}`);
                deletedRow.remove();
                Swal.fire({
                    title: "Product Deleted Successful",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 700
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "ERROR",
                    text: "Something went wrong!",
                });
            }
        },
    })
}


document.addEventListener('DOMContentLoaded', function () {
    let searchInput = document.getElementById('search');

    searchInput.addEventListener('input', function () {
        filterTable(this.value.trim());
    });

    function filterTable(query) {
        let tableRows = document.querySelectorAll('.table tbody tr');
        let found = false;

        tableRows.forEach(row => {
            let codeCell = row.querySelector('td:nth-child(2)');
            let nameCell = row.querySelector('td:nth-child(3)');
            let companyCell = row.querySelector('td:nth-child(4)');

            let codeText = codeCell.textContent.trim().toLowerCase();
            let nameText = nameCell.textContent.trim().toLowerCase();
            let companyText = companyCell.textContent.trim().toLowerCase();

            if (codeText.includes(query.toLowerCase()) ||
                nameText.includes(query.toLowerCase()) ||
                companyText.includes(query.toLowerCase())) {
                row.style.display = '';
                found = true;
            } else {
                row.style.display = 'none';
            }
        });

        let tableNotEmpty = document.querySelector('.table tbody').children.length > 0;
        let noMatchRow = document.querySelector('.table tbody tr.no-match');

        if (tableNotEmpty && noMatchRow) {
            noMatchRow.remove();
        }
    }
});



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

document.getElementById('fileInput').addEventListener('change', function (event) {
    let file = event.target.files[0];
    let imagePreview = document.getElementById('imagePreview');

    if (file) {
        // Check if the selected file is an image
        if (file.type.startsWith('image/')) {
            let reader = new FileReader();
            reader.onload = function (event) {
                // Update the image source with the selected file
                imagePreview.src = event.target.result;
            }
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file (PNG, JPG, JPEG).');
        }
    } else {
        // If no file is selected, reset the image source to the placeholder
        imagePreview.src = 'file.png';
    }
});
