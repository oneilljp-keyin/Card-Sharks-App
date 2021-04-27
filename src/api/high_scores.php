<?php

header("Access-Control-Allow-Origin: *");

$host     = "localhost";
$username = "johnny_o_neill";
$password = "omegatau129beta36pi";
$database = "card-sharks";

// Create connection
$con = mysqli_connect($host, $username, $password, $database);

$method = $_SERVER['REQUEST_METHOD'];
// $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));


if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

switch ($method) {
    case 'GET':
      $sql = "SELECT * from high_scores ORDER BY score DESC LIMIT 10"; 
      break;
    case 'POST':
      $datetime = $_POST["datetime"];
      $name     = $_POST["name"];
      $score    = $_POST["score"];

      $sql = "INSERT INTO high_scores VALUES ('', '$datetime', '$name', '$score')"; 
      break;
}

// run SQL statement
$result = mysqli_query($con,$sql);

// die if SQL statement failed
if (!$result) {
  http_response_code(500);
  die(mysqli_error($con));
}

if ($method == 'GET') {
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
  } elseif ($method == 'POST') {
    echo json_encode($result);
  } else {
    echo mysqli_affected_rows($con);
  }

$con->close();