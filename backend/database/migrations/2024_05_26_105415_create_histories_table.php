<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_crypto');
            $table->string('name_crypto', 40);
            $table->string('slug_crypto', 40);
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
        Schema::table('histories', function (Blueprint $table) {
            // Rimozione della chiave esterna
            $table->dropForeign(['id_crypto']);
            // Rimozione dell'indice
            $table->dropIndex(['id_crypto', 'date']);
        });

        Schema::dropIfExists('histories');
    }
};
