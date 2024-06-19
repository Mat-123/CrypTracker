<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\User;
use GuzzleHttp\Client;
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

    protected $clients;

    public function __construct()
    {
        // Definire i client per le diverse reti
        $this->clients = [
            'mainnet' => new Client([
                'base_uri' => 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
            ]),
            'arbitrum' => new Client([
                'base_uri' => 'https://arbitrum-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
            ]),
            'optimism' => new Client([
                'base_uri' => 'https://optimism-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
            ]),
            'polygon' => new Client([
                'base_uri' => 'https://polygon-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
            ]),
        ];
    }

    public function processPayment(Request $request)
    {
        $validatedData = $request->validate([
            'txHash' => 'required|string',
            'network' => 'required|string|in:mainnet,arbitrum,optimism,polygon',
        ]);

        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Avvia il polling per verificare la transazione
        $this->checkTransactionStatus($validatedData['txHash'], $validatedData['network'], $user);

        return response()->json(['message' => 'Payment processing initiated'], 201);
    }

    protected function checkTransactionStatus($txHash, $network, $user)
    {
        if (!isset($this->clients[$network])) {
            return;
        }

        $client = $this->clients[$network];

        // Polling per verificare lo stato della transazione
        while (true) {
            sleep(10);

            $response = $client->post('', [
                'json' => [
                    'jsonrpc' => '2.0',
                    'method' => 'eth_getTransactionReceipt',
                    'params' => [$txHash],
                    'id' => uniqid(), // Genera un ID univoco per ogni richiesta
                ]
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

            if (isset($data['result'])) {
                $receipt = $data['result'];

                if ($receipt['status'] === '0x1') {
                    // Transazione confermata
                    $user->extendPremium();
                    break;
                }
            }
        }
    }

    public function getUserStats()
    {
        $totalUsers = User::count();
        $premiumUsers = User::where('role', 'premium')->count();

        return response()->json([
            'total_users' => $totalUsers,
            'premium_users' => $premiumUsers,
        ]);
    }
}
