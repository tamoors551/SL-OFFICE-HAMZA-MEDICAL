<?php

include("../connect.php");

$id = $_POST['id'];

$query = "SELECT * FROM `invoice` WHERE `id`='$id'";
$result = mysqli_query($con, $query);
if($result) {
    $row = mysqli_fetch_assoc($result);
        $data = [
            'invoice_no' => $row['invoice_no'],
            'sub_total'  => $row['sub_total'],
            'discount'   => $row['discount'],
            'net_total'  => $row['net_total'] 
        ];
    } else {
    $data = "420";
};
echo json_encode($data);