<?php

include('../../connect.php');

$userContact = $_POST['userContact'];

    $query  = "SELECT * FROM `company` WHERE `user`='$userContact'";
    $result = mysqli_query($con, $query);
    $data = '420';
    if($result){
        $data = [];
        while ($row = mysqli_fetch_array($result)) {
            $data[] = array(
                'id' => $row['id'],
                'company_name' => $row['company_name'],
            );
        }
    };

echo json_encode($data);