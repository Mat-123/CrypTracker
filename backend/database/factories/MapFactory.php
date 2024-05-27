<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Map>
 */
class MapFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_crypto' =>  fake()->unique()->randomNumber(2, false),
            'name_crypto' => fake()->word(),
            'slug_crypto' => fake()->word(),
            'fetch_price' => fake()->boolean(),
        ];
    }
}
