<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MapController;
use App\Http\Controllers\Api\WalletController;
use App\Http\Controllers\Api\TransactionController;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::name('api.')->prefix('v1')->middleware(['auth:sanctum'])->group(function () {
    Route::get('/crypto', [MapController::class, 'search'])->name('crypto.search');
    Route::get('/wallet', [WalletController::class, 'fetchwallet'])->name('wallet.fetchwallet');
    Route::post('/transaction', [TransactionController::class, 'store'])->name('transaction.store');
    Route::get('/transaction/{cryptoId}', [TransactionController::class, 'getTransactionsByUserAndCryptoId'])->name('transaction.getTransactionsByUserAndCryptoId');
    Route::put('/transaction/{transaction}', [TransactionController::class, 'update'])->name('transaction.update');
});
