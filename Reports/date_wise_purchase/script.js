document.getElementById('store_name').innerHTML = localStorage.store_name;
document.getElementById('startDate').valueAsDate = new Date();
document.getElementById('endDate').valueAsDate = new Date();

let getAllInvoicePurchase = () => {

    let contact = localStorage.Contact;
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;


    $.ajax({
        type: "POST",
        url: "./getInvoice.php",
        data: {
            contact: contact
        },
        dataType: "JSON",
        success: function (data) {
            if (data == "420") {
                console.log("Error___!!!");
            } else {
                if (startDate == "" && endDate == "") {
                    var j = 0;
                    $.each(data, function () {
                        j++;
                    });
                } else {
                    $('#getAllInvoicePurchase').empty();
                    var j = 0;
                    $.each(data, function (i) {
                        if (startDate <= data[i].purchase_date && endDate >= data[i].purchase_date) {
                            $('#getAllInvoicePurchase').append(`
                            <tr ${data[i].id}>
                                <td>${data[i].name}</td>
                                <td>${data[i].company}</td>
                                <td>${data[i].quantity}</td>
                                <td>${data[i].total_quantity}</td>
                                <td>${data[i].item_cost}</td>
                                <td>${data[i].item_price}</td>
                                <td>${data[i].total}</td>
                                <td>${data[i].expiry}</td>
                                <td>${data[i].purchase_date}</td>
                            </tr>
                        `);
                        }
                    });
                }
            }
        }
    });
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