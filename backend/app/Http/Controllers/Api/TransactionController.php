<?php

namespace App\Http\Controllers\Api;

use App\Models\Transaction;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        $userId = Auth::id();
        $validatedData = $request->validate([
            'id_crypto' => 'required|integer',
            'quantity' => 'required|integer',
            'transaction_price' => 'required|integer',
            'total_spent' => 'required|integer',
            'transaction_date' => 'required|date',
            'wallet' =>  'nullable|string|max:255',
        ]);
        $validatedData['user_id'] = $userId;
        $transaction = Transaction::create($validatedData);


        return response()->json(['message' => 'Transaction added successfully', 'transaction' => $transaction], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }

    public function getTransactionsByUserAndCryptoId($cryptoId)
    {
        $userId = Auth::id();
        $transactions = Transaction::where('user_id', $userId)
            ->where('id_crypto', $cryptoId)
            ->get();

        return $transactions;
    }
}
