<?php

include ('../../connect.php');

$userContact = $_POST['userContact'];

    $query  = "SELECT * FROM `company` WHERE `user`='$userContact'";
    $result = mysqli_query($con, $query);

    if ($result) {
        $data = [];
        while ($row = mysqli_fetch_array($result)) {
            $data[] = [
                'id'              => $row['id'], 
                'company_name'    => $row['company_name'],
                'company_email'   => $row['company_email'],
                'company_code'    => $row['company_code'],
                'company_website' => $row['company_website'],
                'company_contact' => $row['company_contact'],
                'company_address' => $row['company_address']
            ];
        }
    } else {
        $data = "420";
    }
echo json_encode($data);