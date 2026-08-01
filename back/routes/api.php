<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\RealisationController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\PartnerController;
use App\Http\Controllers\Api\AnnouncementController;

// Public Endpoints
Route::prefix('v1')->group(function () {
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/realisations', [RealisationController::class, 'index']);
    Route::get('/blogs', [BlogController::class, 'index']);
    Route::get('/blogs/{slug}', [BlogController::class, 'show']);
    Route::get('/partners', [PartnerController::class, 'index']);
    Route::get('/announcements', [AnnouncementController::class, 'index']);
    Route::post('/contact', [ContactController::class, 'store']);
    Route::get('/settings', [SettingController::class, 'index']);

    // Admin Auth
    Route::post('/admin/login', [AuthController::class, 'login']);

    // Admin Management (Rest API)
    Route::prefix('admin')->group(function () {
        Route::apiResource('services', ServiceController::class);
        Route::apiResource('realisations', RealisationController::class);
        Route::apiResource('blogs', BlogController::class);
        Route::apiResource('partners', PartnerController::class);
        Route::apiResource('announcements', AnnouncementController::class);
        Route::get('/blogs/{blog}', [BlogController::class, 'show']);
        Route::apiResource('messages', ContactController::class)->only(['index', 'destroy']);
        Route::post('/messages/{id}/read', [ContactController::class, 'markAsRead']);
        Route::post('/messages/read-all', [ContactController::class, 'markAllAsRead']);
        Route::post('/settings', [SettingController::class, 'update']);

        // Image Upload
        Route::post('/upload-image', [UploadController::class, 'uploadImage']);
        Route::delete('/delete-image', [UploadController::class, 'deleteImage']);
    });

});
