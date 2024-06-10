<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class NftTransaction extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'nft_name', 'slug_nft', 'quantity', 'transaction_price', 'total_spent', 'transaction_date', 'transaction_type', 'wallet'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(NftWallet::class);
    }
}
