<?php

namespace App\Http\Controllers\Api;

use App\Models\Map;
use App\Models\Wallet;
use App\Models\Transaction;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreWalletRequest;
use App\Http\Requests\UpdateWalletRequest;

class WalletController extends Controller
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
    public function store(StoreWalletRequest $request)
    {
        $userId = Auth::id();
        $validatedData = $request->validate([
            'id_crypto' => 'required|integer',
            'name_crypto' =>  'nullable|string|max:255',
        ]);
        $validatedData['user_id'] = $userId;
        $addWallet = Wallet::create($validatedData);

        //verify that the id_crypto is marked to store historical data
        $idCrypto = $validatedData['id_crypto'];
        $mapEntry = Map::find($idCrypto);
        if ($mapEntry && $mapEntry->fetch_price == 0) {
            $mapEntry->fetch_price = 1;
            $mapEntry->save();
        }
        return response()->json(['message' => 'Crypto added to Wallet successfully', 'addwallet' => $addWallet], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Wallet $wallet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Wallet $wallet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWalletRequest $request, Wallet $wallet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($idCrypto)
    {
        $userId = Auth::id();

        $wallet = Wallet::where('user_id', $userId)->where('id_crypto', $idCrypto)->first();


        if ($wallet) {
            Transaction::where('user_id', $userId)
                ->where('id_crypto', $idCrypto)
                ->delete();

            $wallet->delete();

            return response()->json(['message' => 'Portafoglio e transazioni cancellati con successo'], 200);
        } else {
            return response()->json(['message' => 'Portafoglio non trovato'], 404);
        }
    }

    public function fetchwallet()
    {
        $userId = Auth::id();
        $wallets = Wallet::where('user_id', $userId)
            ->with(['transactions' => function ($query) use ($userId) {
                $query->where('user_id', $userId);
            }])->get();

        return response()->json($wallets);
    }
}
