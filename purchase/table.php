<?php

include('../connect.php');

$Contact = $_POST['Contact'];

    $query  = "SELECT * FROM `product` WHERE `usercontact`='$Contact'";
    $result = mysqli_query($con, $query);

    if($result){
        $data = [];
        while($row = mysqli_fetch_array($result)) {
            $data[] = [
                'id'      => $row['id'],
                'barcode' => $row['barcode'],
                'name'    => $row['name'],
                'company' => $row['company'],
                'unit'    => $row['unit'],
                'pieces'  => $row['pieces'], 
            ];
        }
    } else {
        $data = "420";
    };
echo json_encode($data);