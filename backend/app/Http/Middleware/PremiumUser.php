<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PremiumUser
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->user() && $request->user()->role === 'premium') {
            return $next($request);
        }

        return response()->json(['error' => 'Access denied. Premium membership required.'], 403);
    }
}
