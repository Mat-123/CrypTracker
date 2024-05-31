<?php

namespace Database\Factories;

use App\Models\Wallet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userid = Wallet::all()->pluck('user_id')->all();
        $idcrypto = Wallet::all()->pluck('id_crypto')->all();
        return [
            'user_id' => fake()->randomElement($userid),
            'id_crypto' => fake()->randomElement($idcrypto),
            'quantity' => fake()->randomNumber(2, false),
            'transaction_price' => fake()->randomNumber(5, false),
            'total_spent' => fake()->randomNumber(5, false),
            'transaction_date' => fake()->date('Y/m/d'),
            'wallet' => fake()->word(),
        ];
    }
}
