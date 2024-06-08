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
            $table->decimal('last_value', total: 18, places: 8)->unsigned()->nullable();
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
