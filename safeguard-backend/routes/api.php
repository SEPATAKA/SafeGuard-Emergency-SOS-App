<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\IncidentController;
use App\Http\Controllers\ContactController; // අලුතින් එකතු කරපු එක

// Authentication API Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes (ලොග් වුණාම විතරක් පාවිච්චි කරන්න පුළුවන් දේවල්)
Route::middleware('auth:sanctum')->group(function () {
    
    // User details
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // SOS API
    Route::post('/sos/trigger', [IncidentController::class, 'triggerSos']);

    // Contacts API
    Route::get('/contacts', [ContactController::class, 'index']);
    Route::post('/contacts', [ContactController::class, 'store']);
    
});