<?php

include('../../connect.php');

$Contact = $_POST['Contact'];
$company = $_POST['company'];
$name = $_POST['name'];
$barcode = $_POST['barcode'];
$unit = $_POST['unit'];
$piece = $_POST['pieces'];
$remarks = $_POST['remarks'];
$image = $_FILES['image']['name'];

$path = '../uploads';
if (!file_exists($path)) {
    mkdir($path);
};
$directory = $path . '/' . $image;
move_uploaded_file($_FILES['image']['tmp_name'], $directory);

$query  = "INSERT INTO `product`(`usercontact`, `name`, `company`, `barcode`, `unit`, `pieces`, `remarks`, `image`)
            VALUES ('$Contact', '$name', '$company', '$barcode', '$unit', '$piece', '$remarks', '$image')";
$result = mysqli_query($con, $query);
    if($result){
        $data = '200';
    } else {
        $data = '420';
    }
echo json_encode($data);