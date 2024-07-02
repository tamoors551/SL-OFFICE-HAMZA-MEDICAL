document.getElementById("store_name").innerHTML = localStorage.store_name;
document.getElementById("sale_netTotal").value = "0.00";

let show_item = () => {
  let item_table = document.getElementById("item_table");
  item_table.innerHTML = "";

  let item_info = JSON.parse(localStorage.getItem("purchase_table") || "[]");

  let i = 0;
  item_info.forEach(function (obj, index) {
    if (obj.packing != "0" || obj.packing < !"0") {
      let row = document.createElement("tr");
      row.setAttribute("id", obj.item_id);
      row.innerHTML = `
                <td hidden>${index + 1}</td>
                <td>${i}.</td>
                <td>${obj.item_name}</td>
                <td>${obj.item_company}</td>
                <td>${obj.item_expiry}</td>
                <td>${obj.item_price}</td>
                <td>${obj.packing}</td>
                <td><button class="btn btn-primary" onclick="populateFields(this, ${index}, ${obj.item_id
        })">Select</button></td>
            `;
      item_table.appendChild(row);
    }
    i++;
  });
};

show_item();

function populateFields(btn, index, id) {
  let row = btn.closest("tr");
  let itemName = row.cells[2].innerText;
  let itemPrice = row.cells[5].innerText;
  let availableQuantity = row.cells[6].innerText;

  document.getElementById("item_name").value = itemName;
  document.getElementById("item_price").value = itemPrice;
  document.getElementById("item_quantity").value = "";
  document.getElementById("item_quantityhidden").value = availableQuantity;
  document.getElementById("itemIndex").value = index;
  document.getElementById("itemID").value = id;
  document.getElementById("item_discount").value = 0;
  updateSubtotal();
  updateNetTotal();
  document.getElementById("item_quantity").focus();
}

function checker() {
  let itemQuantity = document.getElementById("item_quantity").value;
  let item_quantityhidden = document.getElementById(
    "item_quantityhidden"
  ).value;

  if (parseInt(itemQuantity) > parseInt(item_quantityhidden)) {
    Swal.fire({
      icon: "info",
      title: "Quantity Exceeded",
      text: "The quantity entered is greater than available stock.",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
    document.getElementById("item_quantity").value = "";
  }
}

function searchItems() {
  let input = document.getElementById("Search").value.toLowerCase(); // Convert input to lowercase for case-insensitive search
  let tbody = document.getElementById("item_table"); // Replace 'yourTbodyId' with the ID of your tbody element
  let rows = tbody.querySelectorAll("tr");
  let itemsFound = false; // Flag to track if any items are found

  // Clear any existing "No item found" message
  let existingMessage = tbody.querySelector("h3");
  if (existingMessage) {
    existingMessage.remove();
  }

  rows.forEach(function (row) {
    let cells = row.querySelectorAll("td"); // Get all cells in the row
    let foundInRow = false; // Flag to track if item is found in the row
    cells.forEach(function (cell) {
      let cellText = cell.textContent.toLowerCase(); // Convert cell text to lowercase
      if (cellText.includes(input)) {
        foundInRow = true;
      }
    });
    if (foundInRow) {
      row.style.display = ""; // Show row if item is found in it
      itemsFound = true; // Set flag to true if item is found
    } else {
      row.style.display = "none"; // Hide row if item is not found in it
    }
  });

  // Display message if no items are found
  if (!itemsFound) {
    let noItemsFoundRow = document.createElement("tr");
    let noItemsFoundCell = document.createElement("td");
    noItemsFoundCell.textContent = "No item found!";
    noItemsFoundCell.style.color = "red";
    noItemsFoundCell.style.fontSize = "30px";
    noItemsFoundCell.style.fontWeight = "bold";
    noItemsFoundCell.setAttribute("colspan", "7"); // Set colspan attribute
    noItemsFoundRow.appendChild(noItemsFoundCell); // Append cell to the row
    tbody.appendChild(noItemsFoundRow); // Append row to the tbody element
  }
}


searchItems();

document.getElementById("Search").addEventListener("input", searchItems);

let priceInput = document.getElementById("item_price");
let quantityInput = document.getElementById("item_quantity");
let subTotalInput = document.getElementById("item_sub_total");

priceInput.addEventListener("input", updateSubtotal);
quantityInput.addEventListener("input", updateSubtotal);

function updateSubtotal() {
  let price = parseFloat(priceInput.value) || 0;
  let quantity = parseFloat(quantityInput.value) || 0;

  let subtotal = price * quantity;

  subTotalInput.value = subtotal.toFixed(2);
}
updateSubtotal();

let discountInput = document.getElementById("item_discount");
let netTotalInput = document.getElementById("item_net_total");

priceInput.addEventListener("input", updateNetTotal);
quantityInput.addEventListener("input", updateNetTotal);
discountInput.addEventListener("input", updateNetTotal);

function updateNetTotal() {
  let price = parseFloat(priceInput.value) || 0;
  let quantity = parseFloat(quantityInput.value) || 0;
  let discount = parseFloat(discountInput.value) || 0;

  let subTotal = price * quantity;

  if (discount > subTotal) {
    Swal.fire({
      icon: "error",
      text: "Discount cannot be greater than Sub-Total",
    });

    discountInput.value = "";
    discount = 0;
  }
  let netTotal = subTotal - discount;
  netTotalInput.value = netTotal.toFixed(2);
}

window.onload = function () {
  document.getElementById("Search").focus();
};

function calculateAndDisplayTotal() {
  let savedData = JSON.parse(localStorage.getItem("localSaved") || "[]");
  let sum = 0;
  savedData.forEach((item) => {
    sum += parseFloat(item.item_sub_total);
  });
  document.getElementById("sale_subTotal").value = sum.toFixed(2);
}
calculateAndDisplayTotal();

let localSave = () => {
  let item_name = document.getElementById("item_name").value;
  let item_id = document.getElementById("itemID").value;
  let itemIndex = document.getElementById("itemIndex").value;
  let item_price = document.getElementById("item_price").value;
  let item_quantity = document.getElementById("item_quantity").value;
  let item_sub_total = document.getElementById("item_sub_total").value;
  let item_discount = document.getElementById("item_discount").value;
  let item_net_total = document.getElementById("item_net_total").value;

  if (
    item_name == "" ||
    item_price == "" ||
    item_quantity == "" ||
    item_sub_total == "" ||
    item_discount == "" ||
    item_net_total == ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Please Enter Data",
    });
  } else {
    let data = {
      item_id: item_id,
      itemIndex: itemIndex,
      item_name: item_name,
      item_price: item_price,
      item_quantity: item_quantity,
      item_sub_total: item_sub_total,
      item_discount: item_discount,
      item_net_total: item_net_total,
    };
    let savedData = JSON.parse(localStorage.getItem("localSaved") || "[]");
    savedData.push(data);
    localStorage.setItem("localSaved", JSON.stringify(savedData));

    calculateAndDisplayTotal();
    calculateNetTotal();

    var allPurchases = localStorage.getItem("purchase_table");
    var datatype = JSON.parse(allPurchases);
    datatype.forEach(function (item, i) {
      if (itemIndex == i) {
        item.packing -= item_quantity;
      }
    });
    localStorage.setItem("purchase_table", JSON.stringify(datatype));
    show_item();
    clearInputFields();
    displayNewData();
    searchItems();
    hideBtn();
    document.getElementById("sale_discount").value = "0";
    document.getElementById("item_sub_total").value = "0.00";
    document.getElementById("item_discount").value = "0";
  }
};

function displayNewData() {
  var AddBuyInventory = document.getElementById("sale_table");
  var data = JSON.parse(localStorage.getItem("localSaved")) || [];

  AddBuyInventory.innerHTML = "";
  data.forEach(function (item, index) {
    var row = document.createElement("tr");
    row.innerHTML = `
        <td>${index + 1}.</td>
        <td hidden>${item.itemIndex}</td>
        <td>${item.item_name}</td>
        <td>${item.item_price}</td>
        <td>${item.item_quantity}</td>
        <td>${item.item_net_total}</td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteItem(${index}, ${item.item_quantity
      }, ${item.itemIndex})">Remove</button></td>`;

    AddBuyInventory.appendChild(row);
  });
}

displayNewData();

function deleteItem(index, item_quantity, itemIndex) {
  var indexValue = index;
  var quantityValue = item_quantity;
  var itemIndexValue = itemIndex;

  var allPurchases = localStorage.getItem("purchase_table");
  var datatype = JSON.parse(allPurchases);
  datatype.forEach(function (item, i) {
    if (itemIndexValue == i) {
      item.packing += quantityValue;
    }
  });
  localStorage.setItem("purchase_table", JSON.stringify(datatype));

  var data = JSON.parse(localStorage.getItem("localSaved")) || [];
  data.splice(index, 1);
  localStorage.setItem("localSaved", JSON.stringify(data));
  deleteItemAfterCheckQty(itemIndexValue);
  show_item();
}

function deleteItemAfterCheckQty(itemIndex) {
  var addSale = localStorage.getItem("localSaved") || [];
  var allSale = JSON.parse(addSale);

  var key = "itemIndex";
  var valueToMatch = itemIndex;

  for (var i = 0; i < allSale.length; i++) {
    if (allSale[i][key] === valueToMatch) {
      allSale.splice(i, 1);
      i--;
    }
  }
  localStorage.setItem("localSaved", JSON.stringify(allSale));
  displayNewData();
  calculateAndDisplayTotal();
  calculateNetTotal();
}

function clearInputFields() {
  document.getElementById("item_name").value = "";
  document.getElementById("itemID").value = "";
  document.getElementById("item_price").value = "";
  document.getElementById("item_quantity").value = "";
  document.getElementById("item_sub_total").value = "";
  document.getElementById("item_discount").value = "";
  document.getElementById("item_net_total").value = "";
  document.getElementById("item_quantityhidden").value = "";
}

let Exit = () => {
  Swal.fire({
    title: "Are You Sure You Want To Log Out?",
    text: "If You Log Out Than You Have To Login Again ",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Log Out",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      location.href = "../login/index.html";
    }
  });
};

function clearDiscount() {
  document.getElementById("item_discount").value = "";
}
function clearDiscount2() {
  document.getElementById("sale_discount").value = "";
}
document.getElementById("sale_discount").value = "0";

function calculateNetTotal() {
  let subTotal = parseFloat(document.getElementById("sale_subTotal").value);
  let discount = parseFloat(document.getElementById("sale_discount").value);

  if (!isNaN(discount) && discount >= 0) {
    if (discount <= subTotal) {
      let netTotal = subTotal - discount;
      document.getElementById("sale_netTotal").value = netTotal.toFixed(2);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Discount cannot be greater than Sub-Total",
      });
      document.getElementById("sale_discount").value = "";
      document.getElementById("sale_netTotal").value = subTotal.toFixed(2);
    }
  } else if (document.getElementById("sale_discount").value === "") {
    // Display subtotal if discount is empty
    document.getElementById("sale_netTotal").value = subTotal.toFixed(2);
  } else {
    Swal.fire({
      icon: "info",
      title: "Error",
      text: "Please Enter a Valid Discount",
    });
    document.getElementById("sale_discount").value = "";
  }
}

// Trigger the function on page load
calculateNetTotal();

// Add event listeners to trigger the function on keyup and keydown events
document
  .getElementById("sale_discount")
  .addEventListener("keyup", calculateNetTotal);
document
  .getElementById("sale_discount")
  .addEventListener("keydown", calculateNetTotal);

function removeLocalSaved() {
  let removeButtons = document.querySelectorAll(
    "#sale_table button.btn-danger"
  );
  let buttonsCount = removeButtons.length;

  while (buttonsCount > 0) {
    removeButtons[0].click();
    removeButtons = document.querySelectorAll("#sale_table button.btn-danger");
    buttonsCount = removeButtons.length;
  }
  clearCostumer();
  displayNewData();
  calculateAndDisplayTotal();
  calculateNetTotal();
  document.getElementById("sale_discount").value = "0";
  document.getElementById("item_name").value = "";
  document.getElementById("itemID").value = "";
  document.getElementById("item_price").value = "";
  document.getElementById("item_quantity").value = "";
  document.getElementById("item_sub_total").value = "0.00";
  document.getElementById("item_discount").value = "0";
  document.getElementById("item_net_total").value = "";
  document.getElementById("item_quantityhidden").value = "";
}
let clearCostumer = () => {
  document.getElementById("costumer_name").value = "";
  document.getElementById("costumer_number").value = "";
};

let addSaleAllowed = true; // Flag to track if addSale function is allowed to execute

let addSale = () => {
  let savebtn = document.getElementById("savebtn");
  let clearbtn = document.getElementById("clearbtn");
  savebtn.style.display = "none";
  clearbtn.style.display = "none";
  if (!addSaleAllowed) {
    return; // Exit if addSale function is not allowed to execute
  }

  let userContact = localStorage.getItem("Contact");
  let data = localStorage.getItem("localSaved");
  if (!data) {
    Swal.fire({
      icon: "error",
      text: "Please Enter Data",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result) {
        $("#savebtn").show();
        $("#clearbtn").show();
      }
    });
    return;
  }
  let subTotal = document.getElementById("sale_subTotal").value;
  let costumer_name = document.getElementById("costumer_name").value;
  if (costumer_name == "") {
    Swal.fire({
      icon: "error",
      text: "Please Enter Customer Name",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result) {
        $("#savebtn").show();
        $("#clearbtn").show();
      }
    });
    return;
  }
  let costumer_contact = document.getElementById("costumer_number").value;
  if (costumer_contact == "") {
    Swal.fire({
      icon: "error",
      text: "Please Enter Customer Contact",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result) {
        $("#savebtn").show();
        $("#clearbtn").show();
      }
    });
    return;
  }
  let discount = document.getElementById("sale_discount").value;
  if (discount == "") {
    Swal.fire({
      icon: "error",
      text: "Please Enter Discount",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result) {
        $("#savebtn").show();
        $("#clearbtn").show();
      }
    });
    return;
  }
  let netTotal = document.getElementById("sale_netTotal").value;
  let obj = {
    costumer_contact: costumer_contact,
    costumer_name: costumer_name,
    userContact: userContact,
    data: data,
    subTotal: subTotal,
    discount: discount,
    netTotal: netTotal,
  };
  let Obj = JSON.stringify(obj);

  $.ajax({
    type: "POST",
    url: "./add_sale.php",
    data: Obj,
    success: function (data) {
      let responseData = data;

      let desiredId = responseData[1].lastInvoiceId;
      Swal.fire({
        title: "Produce Saved Successful",
        icon: "success",
        showConfirmButton: false,
        timer: 700
      }).then((result) => {
          addSaleAllowed = true;
          $("#savebtn").show();
          $("#clearbtn").show();
      });

      localStorage.removeItem("localSaved");
      displayNewData();
      getItem();
      show_item();
      removeLocalSaved();
      clearInputFields();
      get_user();
      get_data(desiredId);
      get_invoice(desiredId);
      searchItems(); // Assuming this function handles search functionality
      $("#btn1").show();
      $("#btn2").show();
      document.getElementById("item_sub_total").value = "0.00";
      document.getElementById("item_discount").value = "0.00";

      addSaleAllowed = false; // Set flag to false after successful execution
    },
    error: function (xhr, status, error) {
      // Handle error
      console.error("Error occurred:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result) {
          $("#savebtn").show();
          $("#clearbtn").show();
        }
      });
    },
  });
};

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
      let savedData = [];

      data.forEach((object) => {
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

      localStorage.setItem("purchase_table", JSON.stringify(savedData));
    },
  });
};

function hideBtn() {
  $("#btn1").hide();
  $("#btn2").hide();
}

function printModule2(module2) {
  var content = document.getElementById(module2).outerHTML; // Get the outer HTML of the div
  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);
  var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.open();
  // Append the content to the iframe
  iframeDoc.write(
    '<html><head><link rel="stylesheet" type="text/css" href="style.css"></head><body>' +
    content +
    "</body></html>"
  );
  iframeDoc.close();
  $("#btn2").hide();

  setTimeout(function () {
    $("#module2").modal("hide");
    iframe.contentWindow.print();
  }, 1500);
}

function printModule1(module1) {
  var content = document.getElementById(module1).outerHTML; // Get the outer HTML of the div
  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);
  var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(
    '<html><head><link rel="stylesheet" type="text/css" href="style.css"></head><body>' +
    content +
    "</body></html>"
  );
  iframeDoc.close();
  $("#btn1").hide();

  // Delay for 2 seconds before printing
  setTimeout(function () {
    $("#module1").modal("hide");
    iframe.contentWindow.print();

    // Delay for 2.1 seconds before removing the iframe
    setTimeout(function () {
      document.body.removeChild(iframe);
    }, 2000);
  }, 1500);
}

let get_user = () => {
  let store_name = localStorage.store_name;
  let store_address = localStorage.store_address;
  let store_contact = localStorage.store_contact;
  let store_logo = localStorage.logo;

  document.getElementById("store_logo1").src = "../logo/" + store_logo;
  document.getElementById("store_logo2").src = "../logo/" + store_logo;

  document.getElementById("store_name1").innerHTML = store_name;
  document.getElementById("store_address1").innerHTML = store_address;
  document.getElementById("store_contact1").innerHTML = store_contact;

  document.getElementById("store_name2").innerHTML = store_name;
  document.getElementById("store_address2").innerHTML = store_address;
  document.getElementById("store_contact2").innerHTML = store_contact;
};

let get_data = (id) => {
  let tbody1 = document.getElementById("tbody01");
  let tbody2 = document.getElementById("tbody02");
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
      console.log(data);
      if (data !== "420") {
        tbody1.innerHTML = ""; // Clear previous content
        tbody2.innerHTML = ""; // Clear previous content
        let i = 1;
        data.forEach((object) => {
          tbody1.appendChild(createTableRow(i, object));
          tbody2.appendChild(createTableRow(null, object));
          i++;
        });
      } else {
        // Handle error case
        console.error("Error: Unable to fetch data.");
      }
    },
    error: function (xhr, status, error) {
      console.error("AJAX Error:", status, error);
    }
  });
};

function createTableRow(index, object) {
  let row = document.createElement("tr");
  if (index !== null) {
    row.innerHTML += `<td>${index}.</td>`;
  }
  row.innerHTML += `
    <td>${object.item_name}</td>
    <td>${object.item_price}</td>
    <td>${object.quantity}</td>
    <td>${object.total}</td>
  `;
  return row;
}


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
    },
  });
};

var today = new Date();

var formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
document.getElementById('Invoice_Date').textContent = formattedDate;