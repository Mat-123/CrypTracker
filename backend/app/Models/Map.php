<?php

namespace App\Models;

use App\Models\History;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Map extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function histories(): HasMany
    {
        return $this->hasMany(History::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function wallets(): HasMany
    {
        return $this->hasMany(Wallet::class);
    }
}
