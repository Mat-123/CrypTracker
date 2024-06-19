<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class PremiumUser
{
    public function handle(Request $request, Closure $next)
    {
        /** @var \App\Models\User */

        $user = Auth::user();


        if ($user) {
            // Controllo se l'utente ha il ruolo di 'premium'
            if ($user->role === 'premium') {
                // Controllo se la data di scadenza è passata
                if ($user->premium_expiry < Carbon::now()) {

                    $user->update(['role' => 'basic']);
                } else {
                    // L'utente ha ancora il ruolo di 'premium'
                    return $next($request);
                }
            }
        }

        return response()->json(['error' => 'Access denied. Premium membership required.'], 403);
    }
}
