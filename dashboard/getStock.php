<?php
include('../connect.php');

$userContact = $_POST['userContact'];

$query = "SELECT * FROM `purchase` WHERE `contact`='$userContact' AND `packing` > 0 ";
$result = mysqli_query($con, $query);

if($result){
    $data = [];
    while($row = mysqli_fetch_array($result)) {
        $percentage = ($row['packing'] / $row['total_quantity']) * 100;

        if ($percentage < 10) {
            $data[] = [
                'id'             => $row['id'],
                'name'           => $row['name'],
                'company'        => $row['company'],
                'packing'        => $row['packing']
            ];
        }
    }
} else {
    $data = "420"; 
}

echo json_encode($data);
?>
