<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\UpdateCmcApiKeyRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

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
}
