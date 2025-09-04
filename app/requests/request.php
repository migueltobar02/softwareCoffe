<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Ruta hacia Bd/record.json
$file = __DIR__ . "/../Bd/record.json";

// Si ya existe el JSON lo leemos
if (file_exists($file)) {
    $registros = json_decode(file_get_contents($file), true);
    if (!is_array($registros)) {
        $registros = [];
    }
} else {
    $registros = [];
}

// Agregar nuevo registro
$registros[] = $data;

// Guardar en el archivo JSON
if (file_put_contents($file, json_encode($registros, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    header("Content-Type: application/json");
    echo json_encode([
        "message" => "✅ Guardado en record.json",
        "path" => $file,
        "data" => $data
    ]);
} else {
    header("Content-Type: application/json", true, 500);
    echo json_encode(["message" => "❌ Error al guardar en $file"]);
}
?>
