<?php 

include ('../../connect.php');

$contact = $_POST['contact'];
$company = $_POST['company'];

$query = "SELECT * FROM `purchase` WHERE `contact`='$contact' AND `company`='$company'";
$result = mysqli_query($con, $query);

if ($result) {
    $data = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = [
            'id'        => $row['id'],
            'name'      => $row['name'],
            'company'   => $row['company'],
            'expiry'    => $row['expiry'],
            'item_cost' => $row['item_cost'],
            'packing'  => $row['packing'],
        ];
    }
} else {
    $data = "420";
};
echo json_encode($data);
