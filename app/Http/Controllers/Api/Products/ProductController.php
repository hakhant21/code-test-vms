<?php

namespace App\Http\Controllers\Api\Products;

use Exception;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Products\StoreRequest;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Product::query();

            if ($request->has('search')) {
                $query->where('name', 'like', '%' . $request->search . '%');
            }

            $sortField = $request->get('sort', 'name');
            $sortDirection = $request->get('direction', 'asc');

            if (!in_array($sortField, ['name', 'price', 'quantity_available'])) {
                $sortField = 'name';
            }

            if (!in_array($sortDirection, ['asc', 'desc'])) {
                $sortDirection = 'asc';
            }

            $products = $query->orderBy($sortField, $sortDirection)->paginate(10)->withQueryString();

            return response()->json([
                'status' => 'Success',
                'code' => 200,
                'data' => $products
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'Error',
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        try {
            $validated = $request->validated();

            $product = Product::create([
                'name' => $validated['name'],
                'slug' => Str::slug($validated['name']),
                'price' => $validated['price'],
                'quantity_avaliable' => $validated['quantity_avaliable']
            ]);

            return response()->json([
                'status' => 'Success',
                'code' => 200,
                'data' => $product
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'Error',
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        try {
            return response()->json([
                'status' => 'Success',
                'code' => 200,
                'data' => $product
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'Error',
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        try {
            $validated = $request->validated();

            $product->update([
                'name' => $validated['name'],
                'slug' => Str::slug($validated['name']),
                'price' => $validated['price'],
                'quantity_avaliable' => $validated['quantity_avaliable']
            ]);

            return response()->json([
                'status' => 'Success',
                'code' => 200,
                'data' => $product
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'Error',
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            $product->delete();

            return response()->json([
                'status' => 'Success',
                'code' => 200,
                'data' => null
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'Error',
                'code' => 500,
                'message' => $e->getMessage()
            ]);
        }
    }
}
