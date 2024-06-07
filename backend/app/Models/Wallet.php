<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Wallet extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'id_crypto',
        'user_id',
        'name_crypto',
        'last_value',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function Map(): BelongsTo
    {
        return $this->belongsTo(Map::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'id_crypto', 'id_crypto');
    }
}
