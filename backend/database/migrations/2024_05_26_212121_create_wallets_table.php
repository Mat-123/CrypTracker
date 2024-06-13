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
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_crypto');
            $table->unsignedBigInteger('user_id');
            $table->string('name_crypto', 40);
            $table->string('symbol', 40);
            $table->decimal('last_value', total: 20, places: 8)->unsigned()->nullable;

            // definizione degli index
            $table->index(['user_id']);

            //definizione delle chiavi esterne
            $table->foreign('id_crypto')->references('id_crypto')->on('maps');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallets');
    }
};
