<?php

include ('../../connect.php');

$userContact = $_POST['userContact']; 

    $query  = "SELECT * FROM `product` WHERE `usercontact`='$userContact'";
    $result = mysqli_query($con, $query);

    if ($result) {
        $data = [];
        while ($row = mysqli_fetch_array($result)) {
            $data[] = array(
                'id'   => $row['id'], 
                'name' => $row['name'],
                'company_name' => $row['company'],
                'bcode'=> $row['barcode'],
                'unit' => $row['unit'],
                'pieces'=> $row['pieces'],
                'rema' => $row['remarks'],
                'imge' => $row['image'],
            );
        }
    } 
echo json_encode($data);