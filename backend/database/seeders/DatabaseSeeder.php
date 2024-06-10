<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Transaction;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            MapSeeder::class,
            HistorySeeder::class,
            WalletSeeder::class,
            TransactionSeeder::class,
            NftMapSeeder::class,
            NftWalletSeeder::class,
            NftTransactionSeeder::class,
        ]);
    }
}
