<?php
include('../connect.php');

$userContact = $_POST['userContact'];
$type = "sale";

$query  = "SELECT * FROM `invoice` WHERE `contact`='$userContact' AND `type`='$type'";
$result = mysqli_query($con, $query);

if($result){
    $data = [];
    while($row = mysqli_fetch_array($result)) {
        $data[] = [
            'id'               => $row['id'],
            'date'             => $row['date'],
            'customer_name'    => $row['customer_name'],
            'customer_contact' => $row['customer_contact'],
            'net_total'        => $row['net_total'], 
        ];
    }
} else {
    $data = "420";
};
echo json_encode($data);