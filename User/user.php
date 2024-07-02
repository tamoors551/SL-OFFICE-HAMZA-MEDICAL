<?php

include('../connect.php');

$name = $_POST['name'];
$username = $_POST['username'];
$password = $_POST['password'];
$userContact = $_POST['userContact'];
$userCNIC = $_POST['userCNIC'];
$storeName = $_POST['storeName'];
$storeAddress = $_POST['storeAddress'];
$storeContact = $_POST['storeContact'];
$image = $_FILES['image']['name'];

$path = '../uploads';
if (!file_exists($path)) {
    mkdir($path);
};
$directory = $path . '/' . $image;
move_uploaded_file($_FILES['image']['tmp_name'], $directory);

$query  = "INSERT INTO `users`(`name`, `username`, `password`, `cell`, `CNIC`, `store_name`, `address`, `contact`, `logo`)
    VALUES ('$name', '$username', '$password', '$userContact', '$userCNIC', '$storeName', '$storeAddress', '$storeContact', '$image')";
$result = mysqli_query($con, $query);
    if($result){
        $data = '200';
    } else {
        $data = '420';
    }
echo json_encode($data);