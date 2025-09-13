<?php

use App\Http\Controllers\Api\Products\ProductController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::resource('products', ProductController::class);
});
