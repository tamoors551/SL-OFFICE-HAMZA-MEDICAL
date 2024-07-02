<?php
include("../connect.php");

$id = $_POST['id'];

$query = "SELECT * FROM `purchase` WHERE `invoice_id`=?";
$stmt = $con->prepare($query);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result) {
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = [
            'product_id'       => $row['id'],
            'product_name'     => $row['name'],
            'product_quantity' => $row['quantity'],
            'product_total'    => $row['total'],
        ];
    }
    echo json_encode($data);
} else {
    echo json_encode(['error' => 'Error fetching data']);
}