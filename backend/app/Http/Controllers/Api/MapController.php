<?php

namespace App\Http\Controllers\Api;

use App\Models\Map;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMapRequest;
use App\Http\Requests\UpdateMapRequest;

class MapController extends Controller
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
    public function store(StoreMapRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Map $map)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Map $map)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMapRequest $request, Map $map)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Map $map)
    {
        //
    }
    public function search(Request $request)
    {
        // Recupera il termine di ricerca dall'input della richiesta
        $query = $request->input('query');

        // Esegui la query sulla tabella 'map', cercando nella colonna 'name_crypto'
        $results = Map::where('name_crypto', 'LIKE', "%{$query}%")->get();

        // Restituisci i risultati in formato JSON
        return response()->json($results);
    }
}
