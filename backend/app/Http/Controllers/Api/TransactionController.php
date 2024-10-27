<?php

namespace App\Http\Controllers\Api;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use Barryvdh\DomPDF\Facade\Pdf;

class TransactionController extends Controller
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
    public function store(StoreTransactionRequest $request)
    {
        $userId = Auth::id();
        $validatedData = $request->validate([
            'id_crypto' => 'required|integer',
            'quantity' => 'required|numeric',
            'transaction_price' => 'required|numeric',
            'total_spent' => 'required|numeric',
            'transaction_date' => 'required|date',
            'transaction_type' => 'required|integer',
            'wallet' =>  'nullable|string|max:255',
        ]);
        $validatedData['user_id'] = $userId;
        $transaction = Transaction::create($validatedData);


        return response()->json(['message' => 'Transaction added successfully', 'transaction' => $transaction], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {

        $userId = Auth::id();


        if ($transaction->user_id != $userId) {
            return response()->json(['message' => 'Transaction not found or you do not have permission to update this transaction'], 403);
        }


        $transaction->update($request->validated());

        return response()->json(['message' => 'Transaction updated successfully', 'transaction' => $transaction], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        $userId = Auth::id();
        if ($transaction->user_id != $userId) {
            return response()->json(['message' => 'Transaction not found or you do not have permission to delete this transaction'], 403);
        }
        $transaction->delete();
        return response()->json(['message' => 'Transaction deleted successfully'], 200);
    }

    public function getTransactionsByUserAndCryptoId($cryptoId)
    {
        $userId = Auth::id();
        $transactions = DB::table('transactions')
            ->join('maps', 'transactions.id_crypto', '=', 'maps.id_crypto')
            ->where('transactions.user_id', $userId)
            ->where('transactions.id_crypto', $cryptoId)
            ->select('transactions.*', 'maps.last_value', 'maps.symbol', 'maps.name_crypto')
            ->get();

        if ($transactions->isEmpty()) {
            return response()->json(['message' => 'No transactions found'], 404);
        }

        // Get the first transaction to extract common data
        $firstTransaction = $transactions->first();

        // Format the response
        $formattedResponse = [
            'id' => $firstTransaction->id,
            'user_id' => $firstTransaction->user_id,
            'id_crypto' => $firstTransaction->id_crypto,
            'last_value' => $firstTransaction->last_value,
            'name' => $firstTransaction->name_crypto,
            'symbol' => $firstTransaction->symbol,
            'transactions' => $transactions->map(function ($transaction) {
                return [
                    'quantity' => $transaction->quantity,
                    'transaction_price' => $transaction->transaction_price,
                    'total_spent' => $transaction->total_spent,
                    'transaction_date' => $transaction->transaction_date,
                    'transaction_type' => $transaction->transaction_type,
                    'wallet' => $transaction->wallet,
                ];
            }),
        ];

        return response()->json($formattedResponse);
    }

    // public function getTransactionYears()
    // {
    //     $years = Transaction::selectRaw('YEAR(created_at) as year')
    //         ->distinct()
    //         ->orderBy('year', 'desc')
    //         ->pluck('year');

    //     return response()->json($years);
    // }

    // public function downloadPDF(Request $request)
    // {
    //     $year = $request->input('year');
    //     $transactions = Transaction::whereYear('created_at', $year)->get();

    //     $pdf = Pdf::loadView('transactions.report', compact('transactions', 'year'));

    //     return $pdf->download("transactions_report_$year.pdf");
    // }
}
