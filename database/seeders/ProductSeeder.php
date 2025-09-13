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
            ],
            [
                'name' => 'Potato Chip',
                'slug' => 'potato-chip',
                'price' => 9.99,
                'quantity_avaliable' => 25
            ],
            [
                'name' => 'Cake',
                'slug' => 'cake',
                'price' => 6.99,
                'quantity_avaliable' => 10
            ],
            [
                'name' => 'Milk',
                'slug' => 'milk',
                'price' => 7.99,
                'quantity_avaliable' => 30
            ],
            [
                'name' => 'Candy',
                'slug' => 'candy',
                'price' => 2.99,
                'quantity_avaliable' => 35
            ],
            [
                'name' => 'Ice Cream',
                'slug' => 'ice-cream',
                'price' => 2.99,
                'quantity_avaliable' => 30
            ],
            [
                'name' => 'Noodles',
                'slug' => 'noodles',
                'price' => 3.99,
                'quantity_avaliable' => 0
            ],
            [
                'name' => 'Coffee',
                'slug' => 'coffee',
                'price' => 12.99,
                'quantity_avaliable' => 11
            ],
            [
                'name' => 'Tea',
                'slug' => 'tea',
                'price' => 4.99,
                'quantity_avaliable' => 21
            ]
        ];

        foreach($products as $product) {
            Product::create($product);
        }
    }
}
