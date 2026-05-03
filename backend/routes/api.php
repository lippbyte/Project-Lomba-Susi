<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\MusyawarahController;
use App\Http\Controllers\Api\DemosController;
use App\Http\Controllers\Api\VoteController;
use App\Http\Controllers\Api\StatsController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    // ── Auth (public) ───────────────────────────────────────
    Route::post('/login',    [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']); // admin only in prod

    // ── Protected routes ─────────────────────────────────────
    Route::middleware('auth:sanctum')->group(function () {

        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me',      [AuthController::class, 'me']);

        // Posts (Mading)
        Route::apiResource('posts', PostController::class);
        Route::post('/posts/{post}/vote',   [PostController::class, 'vote']);
        Route::post('/posts/{post}/unvote', [PostController::class, 'unvote']);

        // Comments (Forum)
        Route::apiResource('posts.comments', CommentController::class)->shallow();

        // Laporan
        Route::apiResource('reports', ReportController::class);
        Route::get('/reports/track/{code}',          [ReportController::class, 'track']);
        Route::patch('/reports/{report}/status',     [ReportController::class, 'updateStatus'])
            ->middleware('role:osis,guru,admin');

        // Musyawarah
        Route::apiResource('musyawarahs', MusyawarahController::class);
        Route::post('/musyawarahs/{musyawarah}/attend', [MusyawarahController::class, 'attend'])
            ->middleware('role:osis,guru,admin');
        Route::patch('/musyawarahs/{musyawarah}/result', [MusyawarahController::class, 'setResult'])
            ->middleware('role:guru,admin');

        // DEMOS (Voting)
        Route::apiResource('demos', DemosController::class);
        Route::post('/demos/{demos}/vote', [DemosController::class, 'vote']);

        // Dashboard stats (admin only)
        Route::get('/stats', [StatsController::class, 'index'])
            ->middleware('role:admin');
    });
});
