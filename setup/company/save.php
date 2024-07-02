<?php
include('../../connect.php');

$companyName    = $_POST['companyName'];
$companyEmail   = $_POST['companyEmail'];
$companyCode    = $_POST['companyCode'];
$companyWebsite = $_POST['companyWebsite'];
$companyContact = $_POST['companyContact'];
$companyAddress = $_POST['companyAddress'];
$userContact    = $_POST['userContact'];


$query  = "INSERT INTO `company`(`user`, `company_name`, `company_email`, `company_code`, `company_website`, `company_contact`, `company_address`) 
VALUES ('$userContact', '$companyName', '$companyEmail', '$companyCode', '$companyWebsite', '$companyContact', '$companyAddress')";
$result = mysqli_query($con, $query);
if ($result) {
    $data = '200';
} else {
    $data = '420';
}
echo json_encode($data);
