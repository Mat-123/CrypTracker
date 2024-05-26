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
        Schema::create('histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_crypto');
            $table->bigInteger('price')->unsigned()->nullable();
            $table->date('date');
            $table->bigInteger('m_cap')->unsigned()->nullable();
            $table->timestamps();

            // definizione degli index
            $table->index(['id_crypto', 'date']);

            //definizione delle chiavi esterne
            $table->foreign('id_crypto')->references('id_crypto')->on('maps');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(Blueprint $table): void
    {
        $table->dropForeign(['id_crypto']);
        Schema::dropIfExists('histories');
    }
};
