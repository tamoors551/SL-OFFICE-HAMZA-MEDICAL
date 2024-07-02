<?php 

include ('../../connect.php');

$contact = $_POST['contact'];

$query = "SELECT * FROM `sale` WHERE `user_contact`='$contact'";
$result = mysqli_query($con, $query);

if ($result) {
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = [
            'id'         => $row['id'],
            'item_name'  => $row['item_name'],
            'item_price' => $row['item_price'],
            'quantity'   => $row['quantity'],
            'total'      => $row['total'],
            'date'       => $row['date'],
        ];
    }
} else {
    $data = "420"; // Assuming "420" indicates an error.
}

echo json_encode($data);
?>
