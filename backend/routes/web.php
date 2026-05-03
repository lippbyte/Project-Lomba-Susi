<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Welcome to Susi Backend API',
        'version' => '1.0.0',
        'endpoints' => [
            'api' => '/api',
            'documentation' => '/api/documentation',
        ],
    ]);
});
