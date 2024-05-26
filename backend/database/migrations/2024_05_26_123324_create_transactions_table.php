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
            $table->bigInteger('quantity')->unsigned();
            $table->bigInteger('transaction_price')->unsigned();
            $table->bigInteger('total_spent')->unsigned();
            $table->dateTime('transaction_date');
            $table->string('wallet', 200);

            //definizione delle chiavi esterne
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_crypto')->references('id_crypto')->on('maps')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transcations', function (Blueprint $table) {
            // Rimozione delle chiavi esterne
            $table->dropForeign(['user_id']);
            $table->dropForeign(['id_crypto']);
        });
        Schema::dropIfExists('transactions');
    }
};
