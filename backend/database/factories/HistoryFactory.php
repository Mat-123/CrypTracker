<?php

namespace Database\Factories;

use App\Models\Map;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\History>
 */
class HistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $idcrypto = Map::all()->pluck('id_crypto')->all();
        $namecrypto = Map::all()->pluck('name_crypto')->all();
        $slugcrypto = Map::all()->pluck('slug_crypto')->all();
        return [
            'id_crypto' => fake()->randomElement($idcrypto),
            'name_crypto' => fake()->randomElement($namecrypto),
            'slug_crypto' => fake()->randomElement($slugcrypto),
            'price' => fake()->randomNumber(4, false),
            'date' => fake()->dateTimeBetween('-1 week', 'now'),
            'm_cap' => fake()->randomNumber(7, true),

        ];
    }
}
