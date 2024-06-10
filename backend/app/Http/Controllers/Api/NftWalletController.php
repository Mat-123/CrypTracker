<?php

namespace App\Http\Controllers\Api;

use App\Models\NftWallet;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreNftWalletRequest;
use App\Http\Requests\UpdateNftWalletRequest;

class NftWalletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();
        $wallets = NftWallet::where('user_id', $userId)
            ->with(['nft_transactions' => function ($query) use ($userId) {
                $query->where('user_id', $userId);
            }])->get();

        return response()->json($wallets);
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
    public function store(StoreNftWalletRequest $request)
    {
        $userId = Auth::id();
        $validatedData = $request->validate([
            'id_crypto' => 'required|integer',
            'nft_name' =>  'nullable|string|max:255',
            'slug_nft' =>  'nullable|string|max:255',
            'chain' =>  'nullable|string|max:255',

        ]);
        $validatedData['user_id'] = $userId;
        $addWallet = NftWallet::create($validatedData);
    }

    /**
     * Display the specified resource.
     */
    public function show(NftWallet $nftWallet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(NftWallet $nftWallet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNftWalletRequest $request, NftWallet $nftWallet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NftWallet $nftWallet)
    {
        //
    }
}
