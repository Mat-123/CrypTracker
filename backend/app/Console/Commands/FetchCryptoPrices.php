<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Map;
use App\Models\History;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class FetchCryptoPrices extends Command
{
    protected $signature = 'crypto:fetch-prices';
    protected $description = 'Fetch cryptocurrency prices and save to histories table';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $maps = Map::where('fetch_price', 1)->get();

        if ($maps->isEmpty()) {
            $this->info('No cryptocurrencies found with fetch_price = 1');
            return;
        }

        $idCryptos = $maps->pluck('id_crypto')->implode(',');

        // Effettua la chiamata API a CoinMarketCap
        $response = Http::withHeaders([
            'X-CMC_PRO_API_KEY' => env('COINMARKETCAP_API_KEY'),
        ])->get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical', [
            'id' => $idCryptos,
            'count' => 1,
            'interval' => 'daily',
            'time_start' => Carbon::now()->subDay()->toIso8601String(),
            'time_end' => Carbon::now()->toIso8601String(),
        ]);

        $data = $response->json();

        if ($response->failed() || !isset($data['data'])) {
            $this->error('Failed to fetch data from CoinMarketCap API');
            return;
        }

        foreach ($maps as $map) {
            if (isset($data['data'][$map->id_crypto])) {
                $cryptoData = $data['data'][$map->id_crypto]['quote']['USD'];

                DB::table('histories')->insert([
                    'id_crypto' => $map->id_crypto,
                    'name_crypto' => $data['data'][$map->id_crypto]['name'],
                    'slug_crypto' => $data['data'][$map->id_crypto]['slug'],
                    'price' => $cryptoData['price'],
                    'm_cap' => $cryptoData['market_cap'],
                    'mcap_dom' => $cryptoData['market_cap_dominance'],
                    'date' => Carbon::now()->format('Y-m-d')
                ]);
            }
        }

        $this->info('Cryptocurrency prices fetched and saved successfully');
    }
}
