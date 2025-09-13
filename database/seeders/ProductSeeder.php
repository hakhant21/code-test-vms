<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' =>  'Coke',
                'slug'  => 'coke',
                'price' => 3.99,
                'quantity_avaliable' => 10
            ],
            [
                'name' => 'Pepsi',
                'slug' => 'pepsi',
                'price' => 6.89,
                'quantity_avaliable' => 8
            ],
            [
                'name' => 'Water',
                'slug' => 'water',
                'price' => 0.50,
                'quantity_avaliable' => 20
            ],
            [
                'name' => 'Juice',
                'slug' => 'juice',
                'price' => 2.99,
                'quantity_avaliable' => 15
            ],
            [
                'name' => 'Jelly',
                'slug' => 'jelly',
                'price' => 2.99,
                'quantity_avaliable' => 15
            ],
            [
                'name' => 'Chocolate',
                'slug' => 'chocolate',
                'price' => 10.99,
                'quantity_avaliable' => 15
            ]
        ];

        foreach($products as $product) {
            Product::create($product);
        }
    }
}
