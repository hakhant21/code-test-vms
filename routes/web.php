<?php

use App\Http\Controllers\Admin\ProductController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Products\PurchaseController;

Route::middleware('guest')->group(function(){
    Route::get('/', [PurchaseController::class, 'index'])->name('welcome');
    Route::get('/show/{product}', [PurchaseController::class, 'show'])->name('show');
    Route::post('/purchase/{product}', [PurchaseController::class, 'purchase'])->name('purchase');
});

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', function () {

        $transactions = App\Models\Transaction::with('product')->paginate(10)->withQueryString();

        return Inertia::render('Dashboard', [
            'transactions' => $transactions
        ]);
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('admin')->group(function(){
        Route::resource('products', ProductController::class);
    });
});

require __DIR__.'/auth.php';
