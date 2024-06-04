<?php

use App\Http\Controllers\Api\MapController;
use App\Http\Controllers\Api\WalletController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::name('api.')->prefix('v1')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/crypto', [MapController::class, 'search'])->name('crypto.search');
    Route::get('/wallet', [WalletController::class, 'fetchwallet'])->name('wallet.fetchwallet');
});
