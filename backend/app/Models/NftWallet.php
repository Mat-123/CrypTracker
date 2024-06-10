<?php

namespace App\Models;

use App\Models\NftTransaction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class NftWallet extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'nft_name', 'slug_nft', 'chain'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function NftTransactions(): HasMany
    {
        return $this->hasMany(NftTransaction::class);
    }
}
