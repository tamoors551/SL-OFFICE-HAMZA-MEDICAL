<?php
include('../connect.php');

$userContact = $_POST['userContact'];

$query = "SELECT * FROM `invoice` WHERE `type` = 'sale' AND `contact` = '$userContact'";
$result = mysqli_query($con, $query);

if($result){
    $data = [];
    while($row = mysqli_fetch_array($result)) {
        $data[] = [
            'date' => $row['date']
        ];
    }
    echo json_encode($data);
} else {
    echo json_encode([]);
}
?>
