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

    protected $primaryKey = 'id_crypto';
    public $incrementing = false;
    protected $keyType = 'integer';

    public function histories(): HasMany
    {
        return $this->hasMany(History::class);
    }

    public function wallets(): HasMany
    {
        return $this->hasMany(Wallet::class);
    }
}
