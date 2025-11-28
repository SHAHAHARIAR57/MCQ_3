

<?php
$servername = "localhost";
$username = "root";      // default XAMPP username
$password = "";          // default XAMPP password (empty)
$dbname = "storeMS";      // your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get input data
$name = $_POST['name'];
$age = $_POST['age'];

// Insert query
$sql = "INSERT INTO mytable (name, age) VALUES ('$name', '$age')";

if ($conn->query($sql) === TRUE) {
    echo "Data inserted successfully!";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
