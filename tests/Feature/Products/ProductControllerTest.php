<?php

use App\Models\User;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Create an admin and a regular user
    $this->admin = User::factory()->create(['is_admin' => 1]);
    $this->user = User::factory()->create();
});

// ----------------------
// INDEX
// ----------------------
test('admin can see product list', function () {
    Product::factory()->count(3)->create();

    $response = $this->actingAs($this->admin)
        ->get(route('products.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) =>
        $page->component('Admin/Products/Index')
             ->has('products.data', 3)
    );
});

test('non-admin cannot access product list', function () {
    $response = $this->actingAs($this->user)
        ->get(route('products.index'));

    $response->assertForbidden();

});

// ----------------------
// CREATE + STORE
// ----------------------
test('admin can create a product', function () {
    $payload = [
        'name' => 'Coke',
        'slug' => 'coke',
        'price' => 3.99,
        'quantity_avaliable' => 10,
    ];

    $response = $this->actingAs($this->admin)
        ->post(route('products.store'), $payload);

    $response->assertRedirect();
    $this->assertDatabaseHas('products', ['name' => 'Coke']);
});

test('store fails with invalid data', function () {
    $response = $this->actingAs($this->admin)
        ->post(route('products.store'), [
            'name' => '', // invalid
            'price' => -5, // invalid
            'quantity_avaliable' => -1, // invalid
        ]);

    $response->assertSessionHasErrors(['name', 'price', 'quantity_avaliable']);
});

// ----------------------
// UPDATE
// ----------------------
test('admin can update a product', function () {
    $product = Product::factory()->create(['name' => 'Juice']);

    $response = $this->actingAs($this->admin)
        ->put(route('products.update', $product), [
            'name' => 'Jelly',
            'price' => 4.50,
            'quantity_avaliable' => 15,
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('products', ['id' => $product->id, 'name' => 'Jelly']);
});

// ----------------------
// DESTROY
// ----------------------
test('admin can delete a product', function () {
    $product = Product::factory()->create();

    $response = $this->actingAs($this->admin)
        ->delete(route('products.destroy', $product));

    $response->assertRedirect();
    $this->assertDatabaseMissing('products', ['id' => $product->id]);
});
