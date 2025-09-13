<?php

namespace App\Http\Controllers\Products;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\Products\ProductResource;

class PurchaseController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Product::query();

            if ($request->has('search')) {
                $query->where('name', 'like', '%' . $request->search . '%');
            }

            $sort = $request->get('sort', 'name');
            $direction = $request->get('direction', 'asc');

            $products = $query->orderBy($sort, $direction)->paginate(9)->withQueryString();

            return Inertia::render('Guest/Welcome', [
                'products' => ProductResource::collection($products),
                'filters' => $request->only(['search', 'sort', 'direction', 'page'])
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('errors', $e->getMessage());
        }
    }

    public function show(Request $request, Product $product)
    {
        return Inertia::render('Guest/Show', [
            'product' => $product
        ]);
    }

    public function purchase(Request $request, Product $product)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        if ($product->quantity_avaliable < $validated['quantity']) {
            return redirect()->back()->with('errors', 'Not enough stock available.');
        }

        DB::beginTransaction();

        try {
            $product->decrement('quantity_avaliable', $validated['quantity']);

            Transaction::create([
                'product_id' => $product->id,
                'quantity' => $validated['quantity'],
                'total_price' => $product->price * $validated['quantity'],
            ]);

            DB::commit();

            return redirect()->back()->with('success', 'Product purchased successfully.');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('errors', $e->getMessage());
        }
    }
}
