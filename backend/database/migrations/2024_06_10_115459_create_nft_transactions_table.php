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
        Schema::create('nft_transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('nft_name', 100);
            $table->string('slug_nft', 100);
            $table->decimal('quantity', total: 20, places: 9)->unsigned();
            $table->decimal('transaction_price', total: 18, places: 8)->unsigned();
            $table->decimal('total_spent', total: 12, places: 3)->unsigned();
            $table->date('transaction_date');
            $table->boolean('transaction_type');
            $table->string('wallet', 200)->nullable();
            $table->timestamps();

            //definizione delle chiavi esterne
            $table->foreign('user_id')->references('id')->on('nft_wallets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nft_transactions');
    }
};
