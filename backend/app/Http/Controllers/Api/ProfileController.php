<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateCmcApiKeyRequest;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return response()->json($user);
    }

    public function updateCmcApiKey(UpdateCmcApiKeyRequest $request)
    {
        $request->validate([
            'cmc_api_key' => 'nullable|string',
        ]);

        $user = Auth::user();
        if ($user instanceof User) {
            $user->cmc_api_key = $request->input('cmc_api_key');
            $user->save();
        }

        return response()->json(['message' => 'Settings updated successfully.']);
    }

    public function updatePremiumSubscription(Request $request)
    {
        $userId = Auth::id(); // Recupera l'ID dell'utente autenticato

        // Assumiamo che tu stia ricevendo il transactionHash nel corpo della richiesta
        $transactionHash = $request->input('transactionHash');

        // Trova l'utente per l'ID recuperato
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Verifica se l'utente ha già un ruolo premium
        if ($user->role === 'premium') {
            // Aggiungi un anno alla data di scadenza esistente
            $expiryDate = Carbon::parse($user->premium_expiry)->addYear();
        } else {
            // Imposta la data di scadenza a un anno dalla data corrente
            $expiryDate = Carbon::now()->addYear();
        }

        // Aggiorna il ruolo e la data di scadenza premium_expiry
        $user->role = 'premium';
        $user->premium_expiry = $expiryDate;
        $user->transaction_hash = $transactionHash; // Aggiungi transactionHash se necessario
        $user->save();

        // Invia conferma di aggiornamento al frontend
        return response()->json(['message' => 'User role updated successfully', 'expiry_date' => $expiryDate], 200);
    }
}
