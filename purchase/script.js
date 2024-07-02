document.getElementById("store_name").innerHTML = localStorage.store_name;

let table = () => {
    let tbody = document.querySelector('tbody');
    let Contact = localStorage.Contact;

    $.ajax({
        type: 'POST',
        url: './table.php',
        data: {
            Contact: Contact
        },
        dataType: 'JSON',
        success: function (data) {
            if (data.length === 0) { // If data is empty, show "No Item!" message
                tbody.innerHTML = `<tr><td colspan="6" style="color: red;"><h1>No Item !</h1></td></tr>`;
            } else {
                data.forEach(object => {
                    tbody.innerHTML += `
                    <tr id="row_${object.id}">
                        <td>${object.barcode}</td>
                        <td>${object.name}</td>
                        <td>${object.company}</td>
                        <td>${object.pieces}</td>
                        <td>${object.unit}</td>
                        <td><button class="btn btn-primary show-button" id="show">Select</button></td>
                    </tr>
                    `;
                });
            }
        }
    });
};
table();


document.addEventListener('click', function (event) {
    if (event.target.classList.contains('show-button')) {
        let button = event.target;
        let row = button.closest('tr');
        let code = row.querySelector('td:nth-child(1)').textContent;
        let name = row.querySelector('td:nth-child(2)').textContent;
        let company = row.querySelector('td:nth-child(3)').textContent;
        let packing = row.querySelector('td:nth-child(5)').textContent;

        document.getElementById('barcode').value = code;
        document.getElementById('name').value = name;
        document.getElementById('company').value = company;
        document.getElementById('quantity').value = 1;
        document.getElementById('quantity').focus(); // Focus on quantity input field

        let quantity = parseInt(document.getElementById('quantity').value);
        let calculatedPacking = quantity * parseInt(packing);
        localStorage.packing_old = calculatedPacking;
        document.getElementById('packing').value = calculatedPacking;
    }
});


document.addEventListener('DOMContentLoaded', function () {
    let dataTable = document.getElementById('dataTable');
    let searchInput = document.getElementById('search');

    function filterTable() {
        let filter = searchInput.value.toUpperCase();
        let rows = dataTable.getElementsByTagName('tr');

        for (let row of rows) {
            let productName = row.getElementsByTagName('td')[1];
            if (productName) {
                let txtValue = productName.textContent || productName.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        }
    }

    searchInput.addEventListener('input', filterTable);
});

let expiryDate = () => {
    document.getElementById('expiry').valueAsDate = new Date();
}
expiryDate();

function add() {
    let quantity = parseInt(document.getElementById('quantity').value);
    let multiplied_value = localStorage.packing_old;
    let total = quantity * multiplied_value;
    if (!isNaN(total)) {
        document.getElementById('packing').value = total;
        add4(); // Call add4 to recalculate total cost
    }
}

function add2() {
    let quantity = parseInt(document.getElementById('packing').value);
    let old_value = parseInt(document.getElementById('BoxCoast').value);

    let total = old_value / quantity;
    if (total) {
        document.getElementById('ItemCoast').value = total.toFixed(2);
    }
    add4();
}


function add3() {
    let quantity = parseInt(document.getElementById('packing').value);
    let old_value = parseInt(document.getElementById('BoxPrice').value);

    let total = old_value / quantity;
    if (!isNaN(total)) {
        document.getElementById('ItemPrice').value = total.toFixed(2);
    }
}

function add4() {
    let quantity = parseInt(document.getElementById('quantity').value);
    let total_coast = parseInt(document.getElementById('BoxCoast').value);

    let total = total_coast * quantity;
    if (!isNaN(total)) {
        document.getElementById('total').value = total.toFixed(2);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    // Add event listeners to relevant input fields
    document.getElementById('packing').addEventListener('input', add2);
    document.getElementById('BoxCoast').addEventListener('input', add2);

    // Other initialization code...
});


let array = [];

let localSave = () => {

    let Name = document.getElementById('name').value;
    let quantity = document.getElementById('quantity').value;
    let packing = document.getElementById('packing').value;
    let BoxCoast = document.getElementById('BoxCoast').value;
    let ItemCoast = document.getElementById('ItemCoast').value;
    let BoxPrice = document.getElementById('BoxPrice').value;
    let ItemPrice = document.getElementById('ItemPrice').value;
    let total = document.getElementById('total').value;
    let barcode = document.getElementById('barcode').value;
    let expiry = document.getElementById('expiry').value;
    let profit = document.getElementById('profit').value;
    let company = document.getElementById('company').value;

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth()).padStart(2, '0');
    let yyyy = today.getFullYear();

    let formattedToday = yyyy + '-' + mm + '-' + dd;

    if (Name == "" || quantity == "" || packing == "" || BoxCoast == "" || ItemCoast == "" || expiry == "" || BoxPrice == "" || ItemPrice == "" || total == "" || barcode == "" || profit == "") {
        Swal.fire({
            icon: "error",
            title: "Please Enter Data",
        });
    } else {
        if (expiry <= formattedToday) {
            Swal.fire({
                icon: "error",
                text: "Please Enter a Valid Expiry Date",
            });
        } else {
            let data = {
                Name: Name,
                quantity: quantity,
                packing: packing,
                BoxCoast: BoxCoast,
                ItemCoast: ItemCoast,
                BoxPrice: BoxPrice,
                ItemPrice: ItemPrice,
                total: total,
                barcode: barcode,
                expiry: expiry,
                profit: profit,
                company: company,
            };

            let savedData = JSON.parse(localStorage.getItem('save') || '[]');
            savedData.push(data);
            localStorage.setItem('save', JSON.stringify(savedData));
            displayNewData();
            sub();
            hideBtn();
            clearInputFields();
            discount();
            localStorage.removeItem('packing_old');
        }
    }

}
function displayNewData() {
    let tbody = document.querySelector('#tbody2');
    tbody.innerHTML = ''; // Clear the existing table rows

    let data = JSON.parse(localStorage.getItem('save')) || [];

    data.forEach(object => {
        tbody.innerHTML += `
            <tr>
                <td>${object.Name}</td>
                <td>${object.quantity}</td>
                <td>${object.ItemCoast}</td>
                <td>${object.total}</td>
            </tr>
        `;
    });
}


function clearInputFields() {
    document.getElementById('name').value = '';
    document.getElementById('barcode').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('BoxCoast').value = '';
    document.getElementById('BoxPrice').value = '';
    document.getElementById('expiry').value = '';
    document.getElementById('packing').value = '';
    document.getElementById('ItemCoast').value = '';
    document.getElementById('ItemPrice').value = '';
    document.getElementById('total').value = '';
    document.getElementById('profit').value = '';
    document.getElementById('company').value = '';
    expiryDate();
}

let displaydata = () => {
    let tbody2 = document.getElementById('tbody2');
    let data = JSON.parse(localStorage.getItem("save")) || [];

    data.forEach(function (item) {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.Name}</td>
        <td>${item.quantity}</td>
        <td>${item.ItemCoast}</td>
        <td>${item.total}</td>
        `;
        tbody2.appendChild(row);
    });
}

displaydata();

let checkDiscount = () => {

    let netTotal = document.getElementById("netTotal").value;
    if (netTotal == "Error") {
        Swal.fire({
            icon: "error",
            text: "Please Enter Valid Discount",
        });
        $('#saveButton').prop('disabled', true);
    } else {
        $('#saveButton').prop('disabled', false);
    }
}

let Save = () => {
    let data = localStorage.getItem("save");
    if (!data) {
        Swal.fire({
            icon: "error",
            text: "Please Enter Data",
        });
        return;
    }

    let invoice = document.getElementById("invoice").value;
    let subTotal = document.getElementById("subTotal").value;
    let discount = document.getElementById("discount").value;
    let netTotal = document.getElementById("netTotal").value;
    let contact = localStorage.getItem("Contact");

    if (invoice == "") {
        Swal.fire({
            icon: "error",
            text: "Please Enter Invoice No",
        });
    } else {
        let obj = {
            localStorageData: data,
            contact: contact,
            invoice: invoice,
            subTotal: subTotal,
            discount: discount,
            netTotal: netTotal,
        };
        let Obj = JSON.stringify(obj);

        $.ajax({
            type: "POST",
            url: "./save.php",
            data: Obj,
            success: function (data) {
                let responseData = (data);

                let responseCode = responseData[0].respon;
                let desiredId = responseData[0].lastInvoiceId;

                get_user();
                get_data(desiredId);
                get_invoice(desiredId);

                $('#btn1').show();
                $('#btn2').show();

                if (responseCode == '420') {
                    console.log("Error___!!!");
                } else {
                    localStorage.removeItem("save");
                    displayNewData();
                    document.getElementById('subTotal').value = '0.00';
                    document.getElementById('netTotal').value = '0.00';
                    document.getElementById('discount').value = '00';
                    document.getElementById('invoice').value = '';
                    getItem();
                    clearInputFields();
                    Swal.fire({
                        title: "Data Saved Successful",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 700
                    });

                }
            }
        })
    }
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
            location.href = "../login/index.html";
        }
    });
};

let sub = () => {
    let data = JSON.parse(localStorage.getItem('save')) || [];

    let sumSubTotal = 0;

    data.forEach(item => {
        sumSubTotal += parseFloat(item.total);
    });

    // Update input field with the calculated sum
    document.getElementById('subTotal').value = sumSubTotal.toFixed(2); // Assuming you want to display the sum with two decimal places
}
sub();

// ---------------------

let discount = () => {
    // Get the subtotal and discount values
    let subtotal = parseFloat(document.getElementById('subTotal').value);
    let discount = document.getElementById('discount').value;

    if (subtotal < discount || discount < 0) {
        document.getElementById('netTotal').value = "Error";
    } else {
        let netTotal = subtotal - discount;
        document.getElementById('netTotal').value = netTotal.toFixed(2);
    }

}
discount();

// Get today's date
let today2 = new Date();

// Format today2's date as yyyy-mm-dd
let yyyy2 = today2.getFullYear();
let mm2 = String(today2.getMonth() + 1).padStart(2, '0'); // January is 0!
let dd2 = String(today2.getDate()).padStart(2, '0');

let minDate = `${yyyy2}-${mm2}-${dd2}`;

document.getElementById('expiry').setAttribute('min', minDate);

function preventNegative(event) {
    let input = event.target;
    if (input.value < 0) {
        input.value = 0;
    }
}

function discount2() {
    let total = parseFloat(document.getElementById('total').value);
    let Discount = document.getElementById('Discount').value;

    if (total <= Discount || Discount < 0) {
        document.getElementById('Net_Total').value = "Error";
    } else {
        let NetTotal = total - Discount;
        document.getElementById('Net_Total').value = NetTotal.toFixed(2);
    }

}

function profit() {
    let ItemCoast = parseFloat(document.getElementById('ItemCoast').value);
    let ItemPrice = parseFloat(document.getElementById('ItemPrice').value);

    let NetTotal = ItemPrice - ItemCoast;
    document.getElementById('profit').value = NetTotal.toFixed(2);

}

window.onload = function () {
    document.getElementById("search").focus();
};

let get_user = () => {

    let store_name = localStorage.store_name;
    let store_address = localStorage.store_address;
    let store_contact = localStorage.store_contact;
    let store_logo = localStorage.logo;

    document.getElementById('store_logo1').src = "../logo/" + store_logo;
    document.getElementById('store_logo2').src = "../logo/" + store_logo;

    document.getElementById("store_name1").innerHTML = store_name;
    document.getElementById("store_address1").innerHTML = store_address;
    document.getElementById("store_contact1").innerHTML = store_contact;

    document.getElementById("store_name2").innerHTML = store_name;
    document.getElementById("store_address2").innerHTML = store_address;
    document.getElementById("store_contact2").innerHTML = store_contact;
}

let get_data = (id) => {
    let tbody1 = document.getElementById('tbody01');
    let tbody2 = document.getElementById('tbody02');
    let contact = localStorage.Contact;
    $.ajax({
        type: "POST",
        url: "./get_data.php",
        data: {
            id: id,
            contact: contact,
        },
        dataType: "JSON",
        success: function (data) {
            let i = 1;
            data.forEach(object => {
                tbody1.innerHTML += `
                <tr id="row_${object.product_id}">
                    <td>${i}.</td>
                    <td>${object.product_name}</td>
                    <td>${object.product_quantity}</td>
                    <td>${object.product_total}</td>
                </tr>
                `
                i++
            });
            data.forEach(object => {
                tbody2.innerHTML += `
                <tr id="row_${object.product_id}">
                    <td>${object.product_name}</td>
                    <td>${object.product_quantity}</td>
                    <td>${object.product_total}</td>
                </tr>
                `
            });
        }
    })
};

let get_invoice = (id) => {
    let contact = localStorage.Contact;
    $.ajax({
        type: "POST",
        url: "./get_invoice.php",
        data: {
            id: id,
            contact: contact,
        },
        dataType: "JSON",
        success: function (data) {
            if (data == "420") {
                console.log("Error___!!!");
            } else {

                let invoice_no = data.invoice_no;
                let sub_total = data.sub_total;
                let discount = data.discount;
                let net_total = data.net_total;

                document.getElementById("invoice_no1").innerHTML = invoice_no;
                document.getElementById("sub_total1").innerHTML = sub_total;
                document.getElementById("discount1").innerHTML = discount;
                document.getElementById("net_total1").innerHTML = net_total;

                document.getElementById("invoice_no2").innerHTML = invoice_no;
                document.getElementById("sub_total2").innerHTML = sub_total;
                document.getElementById("discount2").innerHTML = discount;
                document.getElementById("net_total2").innerHTML = net_total;
            }
        }
    })
};



function printModule1(module1) {

    var content = document.getElementById(module1).outerHTML; // Get the outer HTML of the div
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write('<html><head><link rel="stylesheet" type="text/css" href="style.css"></head><body>' + content + '</body></html>');
    iframeDoc.close();
    $('#btn1').hide();

    // Delay for 2 seconds before printing
    setTimeout(function () {
        $('#module1').modal('hide');
        iframe.contentWindow.print();


        // Delay for 2.1 seconds before removing the iframe
        setTimeout(function () {
            document.body.removeChild(iframe);
        }, 2000);
    }, 1500);
}

function printModule2(module2) {
    var content = document.getElementById(module2).outerHTML; // Get the outer HTML of the div
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    // Append the content to the iframe
    iframeDoc.write('<html><head><link rel="stylesheet" type="text/css" href="style.css"></head><body>' + content + '</body></html>');
    iframeDoc.close();
    $('#btn2').hide();

    // Delay for 2 seconds before printing
    setTimeout(function () {
        $('#module2').modal('hide');
        iframe.contentWindow.print();
        // Delay for 2.1 seconds before removing the iframe

    }, 1500);
}


var today = new Date();

var formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
document.getElementById('Invoice_Date').textContent = formattedDate;

function hideBtn() {
    $('#btn1').hide();
    $('#btn2').hide();
}

function clearDiscount() {
    document.getElementById("discount").value = "";
}

let getItem = () => {
    let userContact = localStorage.Contact;

    $.ajax({
        type: "POST",
        url: "./getItem.php",
        data: {
            userContact: userContact,
        },
        dataType: "JSON",
        success: function (data) {
            let savedData = []; // Initialize an empty array to store the new data

            data.forEach(object => {
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

            // Save the new data to local storage, overwriting the previous table
            localStorage.setItem('purchase_table', JSON.stringify(savedData));
        }
    });
};

if ($('#dataTable tbody').is(':empty')) {
    // Create a new row with the message "No Item!"
    var newRow = $('<tr>').addClass('no-item-row').append($('<td colspan="6">').text('No Item!').css('color', 'red'));
    
    // Append the new row to the table body
    $('#dataTable tbody').append(newRow);
}