<?php

namespace App\Models;

use App\Models\Map;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class History extends Model
{
    use HasFactory;

    public $timestamps = false;

    public function map(): BelongsTo
    {
        return $this->belongsTo(Map::class);
    }
}
