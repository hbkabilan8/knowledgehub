<?php
include "config.php";
$_SESSION = [];
session_destroy();
echo "success";
?>
