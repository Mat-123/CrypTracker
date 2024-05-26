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
        Schema::create('user_map', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('id_crypto');
            $table->string('name_crypto', 40);
            $table->bigInteger('total_quantity')->unsigned();
            // definizione degli index
            $table->index(['user_id', 'id_crypto']);
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
        Schema::table('user_map', function (Blueprint $table) {
            // Rimozione delle chiavi esterne
            $table->dropForeign(['user_id']);
            $table->dropForeign(['id_crypto']);

            // Rimozione degli indici
            $table->dropIndex(['user_id']);
            $table->dropIndex(['id_crypto']);
        });
        Schema::dropIfExists('user_map');
    }
};
