document.getElementById('store_name').innerHTML = localStorage.store_name;

let getAllInvoiceSale = () => {
    let contact = localStorage.Contact;
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    let counter = 1; // Counter variable for numbering rows
    
    $.ajax({
        type: "POST",
        url: "./getInvoice.php",
        data: {
            contact: contact
        },
        dataType: "JSON",
        success: function (data) {
            if (data == "420") {
                console.log("Error: Unable to fetch data.");
            } else {
                $('#getAllInvoiceSale').empty();
                $.each(data, function (i, invoice) {
                    if ((startDate === "" && endDate === "") || 
                        (invoice.date >= startDate && invoice.date <= endDate)) {
                        $('#getAllInvoiceSale').append(`
                            <tr>
                                <td>${counter}</td>
                                <td>${invoice.item_name}</td>
                                <td>${invoice.item_price}</td>
                                <td>${invoice.quantity}</td>
                                <td>${invoice.total}</td>
                                <td>${invoice.date}</td>
                            </tr>
                        `);
                        counter++; // Increment counter for the next row
                    }
                });
            }
        }
    });
}




document.getElementById('startDate').valueAsDate = new Date();
document.getElementById('endDate').valueAsDate = new Date();

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