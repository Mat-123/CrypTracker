<?php

namespace App\Http\Controllers\Api;

use App\Models\NftTransaction;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreNftTransactionRequest;
use App\Http\Requests\UpdateNftTransactionRequest;

class NftTransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
        $nftTransaction = NftTransaction::where('user_id', $userId)
            ->where('slug_nft')
            ->get();
        return $nftTransaction;
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
    public function store(StoreNftTransactionRequest $request)
    {
        $userId = Auth::id();
        $validatedData = $request->validate([
            'nft_name' => 'required|string|max:255',
            'slug_nft' => 'required|string|max:255',
            'quantity' => 'required|integer',
            'transaction_price' => 'required|integer',
            'total_spent' => 'required|integer',
            'transaction_date' => 'required|date',
            'transaction_type' => 'required|integer',
            'wallet' =>  'nullable|string|max:255',
        ]);
        $validatedData['user_id'] = $userId;
        $transaction = NftTransaction::create($validatedData);


        return response()->json(['message' => 'Transaction added successfully', 'transaction' => $transaction], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(NftTransaction $nftTransaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(NftTransaction $nftTransaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNftTransactionRequest $request, NftTransaction $nftTransaction)
    {
        $userId = Auth::id();

        if ($nftTransaction->user_id != $userId) {
            return response()->json(['message' => 'Transaction not found or you do not have permission to update this transaction'], 403);
        }


        $nftTransaction->update($request->validated());

        return response()->json(['message' => 'Transaction updated successfully', 'transaction' => $nftTransaction], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NftTransaction $nftTransaction)
    {
        $userId = Auth::id();
        if ($nftTransaction->user_id != $userId) {
            return response()->json(['message' => 'Transaction not found or you do not have permission to delete this transaction'], 403);
        }
        $nftTransaction->delete();
        return response()->json(['message' => 'Transaction deleted successfully'], 200);
    }
}
