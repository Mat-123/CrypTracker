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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('id_crypto');
            $table->decimal('quantity', total: 20, places: 9)->unsigned();
            $table->decimal('transaction_price', total: 20, places: 8)->unsigned();
            $table->decimal('total_spent', total: 12, places: 3)->unsigned();
            $table->date('transaction_date');
            $table->boolean('transaction_type');
            $table->string('wallet', 200)->nullable();

            //definizione delle chiavi esterne
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_crypto')->references('id_crypto')->on('wallets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            // Rimozione delle chiavi esterne
            $table->dropForeign(['user_id']);
            $table->dropForeign(['id_crypto']);
        });
        Schema::dropIfExists('transactions');
    }
};
