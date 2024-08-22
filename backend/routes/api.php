<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MenuItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('menus', [MenuItemController::class, 'index']);
    Route::get('menus/{id}', [MenuItemController::class, 'show']);
    Route::post('menus', [MenuItemController::class, 'store']);
    Route::put('menus/{id}', [MenuItemController::class, 'update']);
    Route::delete('menus/{id}', [MenuItemController::class, 'destroy']);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
