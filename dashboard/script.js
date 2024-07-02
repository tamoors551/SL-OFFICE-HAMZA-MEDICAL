// Set the content of an HTML element with id 'store_name' to the value stored in localStorage under the key 'store_name'
document.getElementById('store_name').innerHTML = localStorage.store_name;

// Function to handle logout
let Exit = () => {
  // Display a confirmation dialog using SweetAlert
  Swal.fire({
    title: "Are You Sure You Want To Log Out?",
    text: "If You Log Out Than You Have To Login Again ",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Log Out"
  }).then((result) => {
    // If the user confirms the logout action
    if (result.isConfirmed) {
      // Clear the localStorage
      localStorage.clear();
      // Redirect the user to the login page
      location.href = "../login/index.html";
    }
  });
};

// Function to fetch and display customer data
let show_customer = () => {
  // Retrieve the user's contact information from localStorage
  let userContact = localStorage.Contact;
  // Get the reference to the HTML table where customer data will be displayed
  let costumer_table = document.getElementById("costumer_table");
  // Get today's date in ISO format
  let currentDate = new Date().toISOString().split('T')[0]; 

  // Make an AJAX request to fetch customer data from the server
  $.ajax({
    type: 'POST',
    url: './getCustomer.php',
    data: {
      userContact: userContact
    },
    dataType: 'JSON',
    success: function (data) {
      // Clear the table content before populating
      costumer_table.innerHTML = ""; 

      // Filter the fetched data to get customers for today
      let customersFound = data.filter(object => object.date.split(' ')[0] === currentDate);

      // If no customers found for today, display a message
      if (customersFound.length === 0) {
        costumer_table.innerHTML = `<tr><td colspan="3" style="color: red;"><h2>No Customers Today !</h2></td></tr>`;
      } else {
        // Populate the table with customer data
        customersFound.forEach(object => {
          costumer_table.innerHTML += `
            <tr id="row_${object.id}">
              <td>${object.customer_name}</td>
              <td>${object.customer_contact}</td>
              <td>${object.net_total}</td>
            </tr>
          `;
        });
      }
    }
  });
};
// Call the show_customer function to fetch and display customer data
show_customer();

// Function to fetch and display stock data
let show_stock = () => {
  // Retrieve the user's contact information from localStorage
  let userContact = localStorage.Contact;
  // Get the reference to the HTML table where stock data will be displayed
  let stock_table = document.getElementById("stock_table");

  // Make an AJAX request to fetch stock data from the server
  $.ajax({
    type: 'POST',
    url: './getStock.php',
    data: {
      userContact: userContact
    },
    dataType: 'JSON',
    success: function (data) {
      // Clear the table content before populating
      stock_table.innerHTML = "";

      // If no stock data available, display a message
      if (data.length === 0) {
        stock_table.innerHTML = `<tr><td colspan="3" style="color: blue;"><h2>No Stock Near To End</h2></td></tr>`;
      } else {
        // Populate the table with stock data
        data.forEach(object => {
          stock_table.innerHTML += `
            <tr id="row_${object.id}">
              <td>${object.name}</td>
              <td>${object.company}</td>
              <td style="color: red;">${object.packing}</td>
            </tr>
          `;
        });
      }
    }
  });
};
// Call the show_stock function to fetch and display stock data
show_stock();

// Function to fetch and display expiry data
let show_expiry = () => {
  // Retrieve the user's contact information from localStorage
  let userContact = localStorage.Contact;
  // Get the reference to the HTML table where expiry data will be displayed
  let expiry_table = document.getElementById("expiry_table");

  // Make an AJAX request to fetch expiry data from the server
  $.ajax({
    type: 'POST',
    url: './getExpiry.php',
    data: {
      userContact: userContact
    },
    dataType: 'JSON',
    success: function (data) {
      // Clear the table content before populating
      expiry_table.innerHTML = "";

      // If no expiry data available, display a message
      if (data.length === 0) {
        expiry_table.innerHTML = `<tr><td colspan="4" style="color: blue;"><h2>No Stock Near To Expiry </h2></td></tr>`;
      } else {
        // Populate the table with expiry data
        data.forEach(object => {
          // Calculate days left until expiry
          let expiryDate = new Date(object.expiry);
          let currentDate = new Date();
          let daysLeft = Math.ceil((expiryDate - currentDate) / (1000 * 60 * 60 * 24)); 

          // Determine expiry status and row class based on days left
          let expiryStatus = "";
          let rowClass = "";

          if (expiryDate < currentDate) {
            expiryStatus = "Expired";
            rowClass = "expired";
          } else if (daysLeft <= 0) {
            expiryStatus = "Expired Today";
            rowClass = "expired";
          } else {
            expiryStatus = daysLeft + " days left";
            rowClass = "not-expired";
          }

          // Determine status color class based on row class
          let statusColorClass = rowClass === "expired" ? "expired-color" : "not-expired-color";

          // Populate the table row with expiry data
          expiry_table.innerHTML += `
            <tr id="row_${object.id}">
              <td>${object.name}</td>
              <td>${object.packing}</td>
              <td>${object.expiry}</td>
              <td class="${statusColorClass}">${expiryStatus}</td>
            </tr>
          `;
        });
      }
    }
  });
};
// Call the show_expiry function to fetch and display expiry data
show_expiry();

let saleChart; // Declare saleChart in the global scope

// Function to process the fetched data (both sales and purchase)
function processData(data) {
    // Process the fetched data to get labels (dates) and count
    let dataPerDay = {};
    data.forEach(item => {
        let date = item.date.split(' ')[0]; // Extract date without time
        if (!dataPerDay[date]) {
            dataPerDay[date] = 1; // Initialize count if not exists
        } else {
            dataPerDay[date]++; // Increment count if exists
        }
    });

    // Convert object to array for Chart.js labels and data
    let labels = Object.keys(dataPerDay);
    let count = Object.values(dataPerDay);

    return {
        labels: labels,
        data: count

// Function to render the chart and store data in local storage
function renderChart(data) {
    let ctx = document.getElementById('saleChart').getContext('2d');
  
    // Check if saleChart already exists and destroy it
    if (saleChart) {
        saleChart.destroy();
    }

    saleChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Sales per Day',
                data: data.data,
                backgroundColor: 'rgba(0, 255, 0, 0.2)', // Green color for sales
                borderColor: 'rgba(0, 255, 0, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Store chart data in local storage
    localStorage.setItem('chartData', JSON.stringify(data));
}

// Function to add purchase data to the chart
function addPurchaseDataToChart(purchaseData) {
    // Check if saleChart is defined and has a datasets property
    if (saleChart && saleChart.data && saleChart.data.datasets) {
        // Add purchase data to the chart datasets
        saleChart.data.datasets.push({
            label: 'Purchase per Day',
            data: purchaseData.data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        });
        // Update the chart
        saleChart.update();
    } else {
        console.error('Error: Cannot add purchase data to chart. Sale chart data is undefined.');
    }
}

// Function to check if chart data exists in local storage and render chart
function checkChartDataAndRender() {
    let storedData = localStorage.getItem('chartData');
    if (storedData) {
        let data = JSON.parse(storedData);
        renderChart(data);
    } else {
        console.error('No chart data found in local storage.');
    }
}

// Call the function to check chart data and render chart
checkChartDataAndRender();

// Function to fetch sales and purchase data
$(document).ready(function() {
    let userContact = localStorage.Contact;
    // AJAX request to fetch sales data
    $.ajax({
        type: 'POST',
        url: './getSalesData.php',
        data: {
            userContact: userContact,
        },
        dataType: 'JSON',
        success: function(data) {
            let salesData = processData(data); // Process the fetched sales data
            renderChart(salesData); // Render the chart
        },
        error: function(xhr, status, error) {
            console.error('Error fetching sales data:', error);
        }
    });

    // AJAX request to fetch purchase data
    $.ajax({
        type: 'POST',
        url: './getPurchaseData.php',
        data: {
            userContact: userContact,
        },
        dataType: 'JSON',
        success: function(data) {
            let purchaseData = processData(data); // Process the fetched purchase data
            addPurchaseDataToChart(purchaseData); // Add purchase data to the chart
        },
        error: function(xhr, status, error) {
            console.error('Error fetching purchase data:', error);
        }
    });
});
