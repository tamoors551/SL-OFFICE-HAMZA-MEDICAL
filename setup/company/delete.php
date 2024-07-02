<?php
include('../../connect.php');

$id          = $_POST['id'];
$userContact = $_POST['userContact'];

$response = array();
    // Perform deletion operation here
    $query  = "DELETE FROM `company` WHERE `id` = $id AND `user` = '$userContact'";
    $result = mysqli_query($con, $query);

    if ($result) {
        $data = '200';
    } else {
        $data = '420';
    }

echo json_encode($data);
