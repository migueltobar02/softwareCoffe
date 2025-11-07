<?php

// QUE PUTA MIERDA DE CODIGO ESTRUCTURA, CON TODO RESPETO A VIVAS
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: text/plain; charset=utf-8');

// Capturar usuario y contraseña del formulario (enviado por fetch)
$username = trim($_POST['username'] ?? '');
$password = trim($_POST['password'] ?? '');

// Validar entrada básica
if ($username === '' || $password === '') {
    http_response_code(400);
    echo "Campos vacíos.";
    exit;
}

// Bloquear caracteres típicos de inyección SQL (protección básica)
if (preg_match('/[\'"=;\-]/', $username) || preg_match('/[\'"=;\-]/', $password)) {

    http_response_code(400);
    echo "Entrada no válida.";
    exit;
}

// Ruta del archivo JSON con usuarios
$file = __DIR__ . '/../Bd/record.json';

// Verificar que exista
if (!file_exists($file)) {
    http_response_code(500);
    echo "Base de datos no encontrada.";
    exit;
}

// Cargar usuarios
$data = json_decode(file_get_contents($file), true);

if (!isset($data['users'])) {
    http_response_code(500);
    echo "Formato de base de datos inválido.";
    exit;
}

// Buscar usuario
foreach ($data['users'] as $u) {
    if ($u['username'] === $username && password_verify($password, $u['password'])) {
        echo "OK";
        exit;
    }
}

// Si no se encontró coincidencia
echo "Credenciales inválidas.";
