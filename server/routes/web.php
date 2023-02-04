<?php

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
    Route::get('/logout', [\App\Http\Controllers\LoginController::class, 'logout']);

    Route::post('/login', [\App\Http\Controllers\LoginController::class, 'authenticate']);

    Route::post('/register', [\App\Http\Controllers\LoginController::class, 'register']);

    Route::middleware('auth:sanctum')->get('/status', [\App\Http\Controllers\LoginController::class, 'status']);

});


Route::get('/new_admin', [\App\Http\Controllers\LoginController::class, 'createAdmin']);

Route::middleware('auth:sanctum')->get('/list', [\App\Http\Controllers\PointController::class, 'getPointList']);

Route::middleware('auth:sanctum')->post('/new_point', [\App\Http\Controllers\PointController::class, 'newPoint']);

Route::middleware('auth:sanctum')->delete('/deletePoint', [\App\Http\Controllers\PointController::class, 'deletePoint']);

Route::middleware('auth:sanctum')->get('/user/name', [\App\Http\Controllers\LoginController::class, 'getCurrentUsername']);
