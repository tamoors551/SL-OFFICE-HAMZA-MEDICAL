<?php
include('../connect.php');

$userContact = $_POST['userContact'];

$query = "SELECT * FROM `purchase` WHERE `contact`='$userContact' AND `packing` > 0";

$result = mysqli_query($con, $query);

if ($result) {
    $data = [];
    while ($row = mysqli_fetch_array($result)) {
        $id = $row['id'];
        $name = $row['name'];
        $company = $row['company'];
        $expiry = $row['expiry'];
        $invoice_id = $row['invoice_id'];
        $item_price = $row['item_price'];
        $packing = $row['packing'];
        $data[] = array(
            'id' => $id,
            'name' => $name,
            'company' => $company,
            'expiry' => $expiry,
            'invoice_id' => $invoice_id,
            'item_price' => $item_price,
            'packing' => $packing,
        );
    }
} else {
    $data = "Error";
}

echo json_encode($data);
