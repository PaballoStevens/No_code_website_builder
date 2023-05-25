<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\StorewebController;
use App\Http\Controllers\API\TemplateController;

Route::post('register', [AuthController::class ,'register']);
Route::post('login', [AuthController::class ,'login']);
Route::post('template', [TemplateController::class, 'create']);
Route::get('get-templates', [TemplateController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('logout', [AuthController::class ,'logout']);
    Route::post('storeweb', [StorewebController::class, 'storeweb']);
    Route::get('data', [StorewebController::class, 'index']);
    Route::get('/pages/{identifier}', [StorewebController::class, 'show']);
    Route::get('get-storeweb/{id}', [StorewebController::class, 'edit']);
    Route::put('edit-storeweb/{id}', [StorewebController::class, 'update']);
   
    
    Route::get('/view-template/{identifier}', [TemplateController::class, 'show']);
    Route::get('edit-template/{id}', [TemplateController::class, 'edit']);
     
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
