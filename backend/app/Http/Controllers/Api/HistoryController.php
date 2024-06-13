<?php

namespace App\Http\Controllers\Api;

use App\Models\Wallet;
use App\Models\History;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreHistoryRequest;
use App\Http\Requests\UpdateHistoryRequest;

class HistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($timeframe)
    {
        $userId = Auth::id();

        // Recupera tutte le crypto dal portafoglio dell'utente
        $cryptoIds = Wallet::where('user_id', $userId)
            ->pluck('id_crypto')
            ->toArray();

        // Query base per le storie
        $query = History::select('id_crypto', 'name_crypto', 'slug_crypto', 'price', 'm_cap', 'mcap_dom', 'date')
            ->whereIn('id_crypto', $cryptoIds);

        // Applica il filtro temporale
        switch ($timeframe) {
            case '7d':
                $query->where('date', '>=', now()->subDays(7));
                break;
            case '30d':
                $query->where('date', '>=', now()->subDays(30));
                break;
            case '6m':
                $query->where('date', '>=', now()->subMonths(6));
                break;
            case 'all':
            default:
                // Nessun ulteriore filtraggio necessario per 'all'
                break;
        }

        // Esegui la query e ordina per data
        $histories = $query->orderBy('date')->get();

        // Costruisci l'array risultato
        $result = [];

        foreach ($histories as $history) {
            // Verifica se esiste già un elemento con questo id_crypto nell'array $result
            if (!isset($result[$history->id_crypto])) {
                $result[$history->id_crypto] = [
                    'id_crypto' => $history->id_crypto,
                    'name_crypto' => $history->name_crypto,
                    'slug_crypto' => $history->slug_crypto,
                    'data' => []
                ];
            }

            // Aggiungi i dati storici all'array 'data'
            $result[$history->id_crypto]['data'][] = [
                'price' => $history->price,
                'm_cap' => $history->m_cap,
                'mcap_dom' => $history->mcap_dom,
                'date' => $history->date
            ];
        }

        // Converte l'array associativo in un array numerico per ottenere l'output desiderato
        $formattedResult = array_values($result);

        return response()->json($formattedResult);
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
    public function store(StoreHistoryRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(History $history)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(History $history)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHistoryRequest $request, History $history)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(History $history)
    {
        //
    }
}
