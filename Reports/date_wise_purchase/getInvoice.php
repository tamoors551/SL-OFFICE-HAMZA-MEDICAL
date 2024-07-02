<?php 

include ('../../connect.php');

$contact = $_POST['contact'];

$query = "SELECT * FROM `purchase` WHERE `contact`='$contact'";
$result = mysqli_query($con, $query);

if ($result) {
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = [
            'id'            => $row['id'],
            'name'          => $row['name'],
            'company'       => $row['company'],
            'total_quantity'=> $row['total_quantity'],
            'quantity'      => $row['quantity'],
            'item_cost'     => $row['item_cost'],
            'item_price'    => $row['item_price'],
            'total'         => $row['total'],
            'expiry'        => $row['expiry'],
            'purchase_date' => $row['purchase_date'],
        ];
    }
} else {
    $data = "420";
};
echo json_encode($data);
