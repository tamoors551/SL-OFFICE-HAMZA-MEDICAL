<?php
include("../connect.php");

date_default_timezone_set("Asia/Karachi");
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

$obj = json_decode(file_get_contents("php://input"), true);

$date = date('Y-m-d');
$time = time();


$Data = $obj['data'];
$contact = $obj['userContact'];
$subTotal = $obj['subTotal'];
$discount = $obj['discount'];
$netTotal = $obj['netTotal'];
$customer_name = $obj['costumer_name'];
$customer_contact = $obj['costumer_contact'];
$type = "sale";

// $lastInvoiceId_ofuser = 1;
$check = "SELECT * FROM `invoice` WHERE `contact` = '$contact'";
$result = mysqli_query($con, $check);
if (mysqli_num_rows($result) >= 0) {  
    $check2 = "SELECT MAX(CAST(invoice_no AS UNSIGNED)) AS invoicesss FROM `invoice` WHERE `contact` = '$contact' AND `type` = '$type'";
    $result2 = mysqli_query($con, $check2);
    $row = mysqli_fetch_array($result2); 
    $lastInvoiceId_ofuser = intval($row['invoicesss']) + 1;
} 

$query2  = "INSERT INTO `invoice`(`contact`, `invoice_no`, `date`, `time`, `type`, `sub_total`, `discount`, `net_total`, `customer_name`, `customer_contact`) VALUES ('$contact', '$lastInvoiceId_ofuser', '$date', '$time', '$type', '$subTotal', '$discount', '$netTotal', '$customer_name', '$customer_contact')";
$result2 = mysqli_query($con, $query2);
$lastInvoiceId = mysqli_insert_id($con);

$object  = json_decode($Data, true);

if (!empty($object) && is_array($object)) {
    $result = true;

    foreach ($object as $data) {

        $id = $data['item_id'];
        $item_name = $data['item_name'];
        $item_price = $data['item_price'];
        $item_quantity = $data['item_quantity'];
        $item_sub_total = $data['item_sub_total'];

        $query  = "INSERT INTO `sale`(`invoice_id`, `user_contact`, `item_name`, `item_price`, `quantity`, `total`, `date`) VALUES ('$lastInvoiceId', '$contact', '$item_name', '$item_price', '$item_quantity', '$item_sub_total', '$date')";
        $result = mysqli_query($con, $query);
        $lastPurchaseId = mysqli_insert_id($con);

        if ($result) {
            $data1122[] = array(
                'response' => "200",
            );
        } else {
            echo "42000";
        }
    }

    foreach ($object as $data) {
        $id = $data['item_id'];
        $item_quantity = $data['item_quantity'];

        $query3 = "SELECT * FROM `purchase` WHERE `id`='$id'";
        $result3 = mysqli_query($con, $query3);
        if ($result3) {
            $row = mysqli_fetch_array($result3);
            $packing = $row['packing'];
        }
        $newQuantity = $packing - $item_quantity;

        $query23  = "UPDATE `purchase` SET `packing`='$newQuantity' WHERE `id`='$id'";
        $result5 = mysqli_query($con, $query23);
    }

    if ($result) {
        $data1122[] = array(
            'response' => "200",
            'lastInvoiceId' => $lastInvoiceId,
        );
    } else {
        $data1122[] = array(
            'response' => "420",
            'error' => "Failed to execute queries"
        );
    }
} else {
    $data1122[] = array(
        'response' => "400",
        'error' => "Invalid data format"
    );
}

echo json_encode($data1122);