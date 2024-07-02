<?php
include('../connect.php');

$name = $_POST['name'];
$pass = $_POST['pass'];

$query  = "SELECT * FROM `users` WHERE `password`='$pass' AND `username`='$name'";
$result = mysqli_query($con, $query);
if ($result) {
    $count = mysqli_num_rows($result);
    if ($count > 0) {
        $row = mysqli_fetch_array($result);
        $data = [
            'contact'       => $row['cell'],
            'store_name'    => $row['store_name'],
            'store_address' => $row['address'],
            'store_contact' => $row['contact'],
            'logo'          => $row['logo'],
        ];
    } else {
        $data = 'Invalid';
    }
} else {
    $data = 'Error';
}
echo json_encode($data);
?>
