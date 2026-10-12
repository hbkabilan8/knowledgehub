<?php
include "config.php";
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Please login first']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid data']);
    exit();
}

$user_id         = (int)$_SESSION['user_id'];
$test_id         = (int)$data['testId'];
$score           = (int)$data['score'];
$total_questions = (int)$data['totalQuestions'];
$percentage      = (float)$data['percentage'];
$time_taken      = (int)$data['timeTaken'];

$stmt = $conn->prepare(
    "INSERT INTO user_tests (user_id, test_id, score, total_questions, percentage, time_taken_seconds, status, completed_at)
     VALUES (?, ?, ?, ?, ?, ?, 'completed', NOW())"
);

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'DB error: ' . $conn->error]);
    exit();
}

$stmt->bind_param("iiiidi", $user_id, $test_id, $score, $total_questions, $percentage, $time_taken);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Saved', 'result_id' => $stmt->insert_id]);
} else {
    echo json_encode(['success' => false, 'message' => $stmt->error]);
}
$stmt->close();
?>
