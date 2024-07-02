<?php
// Including the file which contains database connection details
include('../connect.php');

// Retrieving user contact information from POST request
$userContact = $_POST['userContact'];

// Calculate the date 30 days from now
$thirtyDaysFromNow = date('Y-m-d', strtotime('+30 days'));

// Constructing the SQL query to fetch purchase records meeting specified conditions
$query = "SELECT * FROM `purchase` WHERE `contact`='$userContact' AND `packing` > 0 AND `expiry` <= '$thirtyDaysFromNow'";

// Executing the SQL query
$result = mysqli_query($con, $query);

// Checking if the query was executed successfully
if($result){
    // Initializing an empty array to store fetched data
    $data = [];
    
    // Looping through each fetched row from the result set
    while($row = mysqli_fetch_array($result)) {
        // Building an associative array for each row and appending it to the data array
        $data[] = [
            'id'             => $row['id'],
            'name'           => $row['name'],
            'packing'        => $row['packing'],
            'expiry'         => $row['expiry']
        ];
    }
} else {
    // If the query fails, set the data variable to a custom error code or message
    $data = "420"; // Custom error code or message
}

// Encoding the fetched data (or error code) into JSON format and outputting it
echo json_encode($data);
?>
