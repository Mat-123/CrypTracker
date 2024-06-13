<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('maps', function (Blueprint $table) {
            $table->unsignedBigInteger('id_crypto')->primary();
            $table->string('name_crypto', 40);
            $table->string('slug_crypto', 40);
            $table->string('symbol', 40);
            $table->decimal('last_value', total: 20, places: 8)->unsigned()->nullable();
            $table->decimal('mcap', total: 25, places: 2)->unsigned()->nullable();
            $table->decimal('volume_24h', total: 25, places: 2)->unsigned()->nullable();
            $table->decimal('percent_change_24h', total: 14, places: 6)->nullable();
            $table->decimal('percent_change_7d', total: 14, places: 6)->nullable();
            $table->boolean('fetch_price')->default(false);
            $table->timestamps();

            // definizione degli index
            $table->index(['id_crypto', 'fetch_price']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maps');
    }
};
