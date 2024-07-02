<?php
$Contact = $_POST['Contact'];
$rowId = $_POST['rowId'];

$filePath = "files/$Contact.txt";

$data = file($filePath);

unset($data[$rowId]);

file_put_contents($filePath, implode("", $data));
