<?php

// SPDX-License-Identifier: PROPRIETARY
/**
 * @file src/lib/php/quillit-media-library.php
 * @fileoverview Endpoint JSON para biblioteca de mídia local (lista imagens com proteção contra traversal e validação de extensão).
 * @author Jeferson Padilha (https://jepasa.com)
 * @license Proprietary - All Rights Reserved
 * @see ../../../LICENSE
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

// Auto-detectar webRoot: $_SERVER['DOCUMENT_ROOT'] ou subir do __DIR__
$webRoot = $_SERVER['DOCUMENT_ROOT'] ?? dirname(__DIR__, 5);

$dirParam = (string)($_GET['dir'] ?? '');
$dirParam = trim($dirParam);

$pathParam = (string)($_GET['path'] ?? '');
$pathParam = trim($pathParam);

if ($dirParam === '') {
    respond(400, [
    'ok' => false,
    'error' => 'Parâmetro "dir" é obrigatório (relativo ao webroot).',
    ]);
}

function decodeParam(string $value): string
{
    $decoded = $value;
    for ($i = 0; $i < 2; $i += 1) {
        $decoded = rawurldecode($decoded);
    }
    return $decoded;
}

function hasTraversal(string $value): bool
{
    $normalized = str_replace('\\', '/', $value);
    if ($normalized === '') {
        return false;
    }
    if (str_contains($normalized, "\0")) {
        return true;
    }
    if (preg_match('/^[a-zA-Z]:/', $normalized) === 1) {
        return true;
    }
    if (str_contains($normalized, '..')) {
        return true;
    }
    return false;
}

$dirParamDecoded = decodeParam($dirParam);
$pathParamDecoded = decodeParam($pathParam);

// Normaliza e bloqueia tentativas de traversal (incluindo valores codificados)
$dirParam = str_replace('\\', '/', $dirParamDecoded);
$dirParam = ltrim($dirParam, '/');

$pathParam = str_replace('\\', '/', $pathParamDecoded);
$pathParam = trim($pathParam, '/');

if (hasTraversal($dirParam)) {
    respond(400, [
        'ok' => false,
        'error' => 'Diretório inválido.',
    ]);
}

if ($pathParam !== '' && hasTraversal($pathParam)) {
    respond(400, [
        'ok' => false,
        'error' => 'Subpasta inválida.',
    ]);
}

$basePath = realpath($webRoot . '/' . $dirParam);
if ($basePath === false || !is_dir($basePath)) {
    respond(404, [
    'ok' => false,
    'error' => 'Diretório não encontrado.',
    ]);
}

$webRootReal = realpath($webRoot);
if ($webRootReal === false) {
    respond(500, [
    'ok' => false,
    'error' => 'Falha ao resolver webroot.',
    ]);
}

// Garante que o diretório alvo está dentro do webroot
$targetCandidate = $basePath;
if ($pathParam !== '') {
    $targetCandidate = $basePath . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $pathParam);
}

$targetReal = realpath($targetCandidate);
if ($targetReal === false || !str_starts_with($targetReal, $webRootReal . DIRECTORY_SEPARATOR)) {
    respond(403, [
    'ok' => false,
    'error' => 'Acesso negado.',
    ]);
}

// Garante também que a subpasta está dentro do diretório base solicitado
$baseReal = realpath($basePath);
if ($baseReal === false || (!str_starts_with($targetReal, $baseReal . DIRECTORY_SEPARATOR) && $targetReal !== $baseReal)) {
    respond(403, [
    'ok' => false,
    'error' => 'Acesso negado.',
    ]);
}

$allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
$allowedMime = [
    'jpg' => ['image/jpeg'],
    'jpeg' => ['image/jpeg'],
    'png' => ['image/png'],
    'gif' => ['image/gif'],
    'webp' => ['image/webp'],
    'svg' => ['image/svg+xml'],
];

$finfo = finfo_open(FILEINFO_MIME_TYPE);
if ($finfo === false) {
    respond(500, [
        'ok' => false,
        'error' => 'Extensão Fileinfo indisponível no servidor.',
    ]);
}

$items = [];
$entries = @scandir($targetReal);
if ($entries === false) {
    respond(500, [
    'ok' => false,
    'error' => 'Falha ao ler o diretório.',
    ]);
}

function encodeUrlPath(string $path): string
{
    $path = trim($path, '/');
    if ($path === '') {
        return '';
    }
    $parts = explode('/', $path);
    $encoded = array_map(static fn($p) => rawurlencode($p), $parts);
    return implode('/', $encoded);
}

$dirForUrl = '/' . trim($dirParam, '/');
$pathForUrl = $pathParam !== '' ? '/' . encodeUrlPath($pathParam) : '';

foreach ($entries as $entry) {
    if ($entry === '.' || $entry === '..') {
        continue;
    }
    if ($entry === '' || $entry[0] === '.') {
        continue;
    }

    $full = $targetReal . DIRECTORY_SEPARATOR . $entry;
    if (is_dir($full)) {
        $subPath = $pathParam !== '' ? ($pathParam . '/' . $entry) : $entry;
        $items[] = [
        'type' => 'dir',
        'name' => $entry,
        'path' => $subPath,
        ];
        continue;
    }

    if (!is_file($full)) {
        continue;
    }

    $ext = strtolower(pathinfo($entry, PATHINFO_EXTENSION));
    if ($ext === '' || !in_array($ext, $allowedExt, true)) {
        continue;
    }

    $mime = finfo_file($finfo, $full);
    if ($mime === false) {
        continue;
    }

    $allowedForExt = $allowedMime[$ext];
    if (!in_array($mime, $allowedForExt, true)) {
        continue;
    }

    $relative = $pathParam !== '' ? ($pathParam . '/' . $entry) : $entry;
  // URL web (assume que o diretório é servível)
    $url = $dirForUrl . $pathForUrl . '/' . rawurlencode($entry);

    $items[] = [
    'type' => 'file',
    'name' => $entry,
    'relative' => $relative,
    'url' => $url,
    ];
}

finfo_close($finfo);

respond(200, [
  'ok' => true,
  'dir' => $dirParam,
  'path' => $pathParam,
  'count' => count($items),
  'items' => $items,
]);
