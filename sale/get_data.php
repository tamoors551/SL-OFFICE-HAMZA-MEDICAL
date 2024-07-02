<?php
include("../connect.php");

$id = $_POST['id'];
$contact = $_POST['contact'];

$query = "SELECT * FROM `sale` WHERE `id`='$id'";
$result = mysqli_query($con, $query);

if ($result) {
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = array(
            'id' => $row['id'],
            'item_name' => $row['item_name'],
            'item_price' => $row['item_price'],
            'quantity' => $row['quantity'],
            'total' => $row['total']
        );
    }
    echo json_encode($data);
} else {
    $error = array('error' => 'Unable to fetch data from the database.');
    echo json_encode($error);
}
