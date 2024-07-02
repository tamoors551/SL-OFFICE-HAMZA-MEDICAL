<?php
include('../../connect.php');

$response = array();

if (isset($_POST['id']) && isset($_POST['Contact'])) {
    $id = $_POST['id'];
    $Contact = $_POST['Contact'];

    // Perform deletion operation here
    $query  = "DELETE FROM `product` WHERE `id` = $id AND `usercontact` = '$Contact'";
    $result = mysqli_query($con, $query);

    if ($result) {
        $response['status'] = 'success';
    } else {
        $response['status'] = 'error';
    }
} else {
    $response['status'] = 'error';
}

echo json_encode($response);
?>
