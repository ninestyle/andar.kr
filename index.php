<?php
declare(strict_types=1);

/**
 * @version 1.0
 * @author Maxim
 */

$enginePath = null;
$currentPath = __DIR__;

while (true) {
    $potentialPath = $currentPath . '/@/ssr.php';
    if (file_exists($potentialPath)) {
        $enginePath = $potentialPath;
        break;
    }
    if ($currentPath === dirname($currentPath)) {
        break;
    }
    $currentPath = dirname($currentPath);
}

if ($enginePath) {
    require_once $enginePath;
} else {
    http_response_code(503);
    header('Content-Type: text/plain; charset=utf-8');
    exit('CRITICAL ERROR: The Page Express SSR engine could not be located.');
}