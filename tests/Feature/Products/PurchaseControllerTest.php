<?php

use App\Models\User;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guest can view product list', function () {
    Product::factory()->count(3)->create();

    $response = $this->get(route('welcome'));

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page->component('Guest/Welcome')
             ->has('products.data', 3)
    );
});

test('guest can view a single product detail page', function () {
    $product = Product::factory()->create();

    $response = $this->get(route('show', $product));

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page->component('Guest/Show')
             ->where('product.id', $product->id)
    );
});

test('guest can purchase a product with enough stock', function () {
    $product = Product::factory()->create(['quantity_avaliable' => 10]);

    $response = $this->post(route('purchase', $product), ['quantity' => 3]);

    $response->assertRedirect();
    $response->assertSessionHas('success', 'Product purchased successfully.');

    // Stock should decrement
    expect($product->fresh()->quantity_avaliable)->toBe(7);

    // Transaction should be recorded
    $this->assertDatabaseHas('transactions', [
        'product_id' => $product->id,
        'quantity' => 3,
        'total_price' => $product->price * 3,
    ]);
});

test('purchase fails when stock is insufficient', function () {
    $product = Product::factory()->create(['quantity_avaliable' => 2]);

    $response = $this->post(route('purchase', $product), ['quantity' => 5]);

    $response->assertSessionHas('errors', 'Not enough stock available.');

    // Stock should remain unchanged
    expect($product->fresh()->quantity_avaliable)->toBe(2);

    // No transaction created
    $this->assertDatabaseCount('transactions', 0);
});

test('purchase fails with invalid quantity', function () {
    $product = Product::factory()->create(['quantity_avaliable' => 5]);

    $response = $this->post(route('purchase', $product), ['quantity' => 0]); // invalid

    $response->assertSessionHasErrors(['quantity']);

    // No transaction created
    $this->assertDatabaseCount('transactions', 0);
});
