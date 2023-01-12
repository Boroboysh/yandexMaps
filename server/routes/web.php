<?php

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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/logout', [\App\Http\Controllers\ApiController::class, 'logout']);

Route::post('/auth', [\App\Http\Controllers\LoginController::class, 'authenticate']);

Route::post('/register', [\App\Http\Controllers\ApiController::class, 'register']);

Route::middleware('auth:sanctum')->get('/list', [\App\Http\Controllers\ApiController::class, 'getPointList']);

Route::middleware('auth:sanctum')->post('/new_point', [\App\Http\Controllers\ApiController::class, 'newPoint']);

Route::middleware('auth:sanctum')->delete('/deletePoint', [\App\Http\Controllers\ApiController::class, 'deletePoint']);
