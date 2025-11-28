<?php
  $hostname = 'localhost';
  $username= 'root';
  $password = '';
  $dbname   = 'storems';

  $conn = new mysqli($hostname, $username, $password,$dbname);

  if($conn->connect_error)
    die("connection_falied : " . $conn->connect_error);
   
?>