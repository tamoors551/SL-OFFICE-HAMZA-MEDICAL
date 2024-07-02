<?php 

include("../connect.php");

date_default_timezone_set("Asia/Karachi");
header('Content-Type: application/json');
header("Access-Controll-Allow-Origin: *");
header("Access-Controll-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
header("Access-Controll-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

$obj = json_decode(file_get_contents("php://input"), true);

$date = date('Y-m-d');
$time = time();

$Data = $obj['localStorageData'];
$contact = $obj['contact'];
$invoice = $obj['invoice'];
$subTotal = $obj['subTotal'];
$discount = $obj['discount'];
$netTotal = $obj['netTotal'];
$type = "purchase";

$query2  = "INSERT INTO `invoice`(`contact`, `invoice_no`, `date`, `time`, `type`, `sub_total`, `discount`, `net_total`) VALUES ('$contact', '$invoice', '$date', '$time', '$type', '$subTotal', '$discount', '$netTotal')";
$result2 = mysqli_query($con, $query2); 
$lastInvoiceId = mysqli_insert_id($con);

$object  = json_decode($Data, true);

foreach( $object as $data ){ 
    $name = $data['Name'];
    $quantity = $data['quantity'];
    $packing = $data['packing'];
    $BoxCoast = $data['BoxCoast'];
    $ItemCoast = $data['ItemCoast'];
    $BoxPrice = $data['BoxPrice'];
    $ItemPrice = $data['ItemPrice'];
    $total = $data['total'];
    $barcode = $data['barcode'];
    $expiry = $data['expiry'];
    $profit = $data['profit'];
    $company = $data['company'];

    $query  = "INSERT INTO `purchase`(`contact`, `invoice_id`, `name`, `company`, `total_quantity`, `quantity`, `packing`, `box_cost`, `item_cost`, `box_price`, `item_price`, `total`, `profit`, `barcode`, `expiry`, `purchase_date`) VALUES 
    ('$contact', '$lastInvoiceId', '$name', '$company', '$packing', '$quantity', '$packing', '$BoxCoast', '$ItemCoast', '$BoxPrice', '$ItemPrice', '$total', '$profit', '$barcode', '$expiry', '$date')";
    $result = mysqli_query($con, $query);
    $lastPurchaseId = mysqli_insert_id($con);
};

if ($result && $result2) {
    $data1122[] = array(
        'respon' => "200",
        'lastInvoiceId' => $lastInvoiceId
    );
} else {
    $data1122 = [];
};
echo json_encode($data1122);