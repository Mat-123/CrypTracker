<?php

namespace Database\Factories;

use App\Models\Map;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Wallet>
 */
class WalletFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $iduser = User::all()->pluck('id')->all();
        $namecrypto = Map::all()->pluck('name_crypto')->all();
        $idcrypto = Map::all()->pluck('id_crypto')->all();
        return [
            'user_id' => fake()->randomElement($iduser),
            'id_crypto' => fake()->randomElement($idcrypto),
            'name_crypto' => fake()->randomElement($namecrypto),
        ];
    }
}
