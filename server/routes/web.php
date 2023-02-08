<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PointController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/home', function () {
    return view('welcome');
});

Route::prefix('auth')->group(function () {
    Route::get('/logout', [LoginController::class, 'logout']);

    Route::post('/login', [LoginController::class, 'authenticate']);

    Route::post('/register', [LoginController::class, 'register']);

    Route::middleware('auth:sanctum')->get('/status', [LoginController::class, 'status']);

    Route::get('/check', [LoginController::class, 'status']);
});


Route::get('/new_admin', [LoginController::class, 'createAdmin']);

Route::prefix('point')->group(function () {
    Route::middleware('auth:sanctum')->get('/list', [PointController::class, 'getPointList']);

    Route::middleware('auth:sanctum')->post('/new', [PointController::class, 'newPoint']);

    Route::middleware('auth:sanctum')->patch('/update/{id}', [PointController::class, 'updatePoint']);

    Route::middleware('auth:sanctum')->delete('/delete/{id}', [PointController::class, 'deletePoint']);
});

Route::middleware('auth:sanctum')->get('/user/name', [LoginController::class, 'getCurrentUsername']);
