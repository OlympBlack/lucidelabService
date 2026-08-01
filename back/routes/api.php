<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\RealisationController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\AuthController;

// Public Endpoints
Route::prefix('v1')->group(function () {
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/realisations', [RealisationController::class, 'index']);
    Route::get('/blogs', [BlogController::class, 'index']);
    Route::get('/blogs/{slug}', [BlogController::class, 'show']);
    Route::post('/contact', [ContactController::class, 'store']);
    Route::get('/settings', [SettingController::class, 'index']);

    // Admin Auth
    Route::post('/admin/login', [AuthController::class, 'login']);

    // Admin Management (Rest API)
    Route::prefix('admin')->group(function () {
        Route::apiResource('services', ServiceController::class);
        Route::apiResource('realisations', RealisationController::class);
        Route::apiResource('blogs', BlogController::class);
        Route::apiResource('messages', ContactController::class)->only(['index', 'destroy']);
        Route::post('/settings', [SettingController::class, 'update']);
    });
});
