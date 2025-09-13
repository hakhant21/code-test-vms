import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import ProductCard from "@/Components/Products/ProductCard";

export default function Show({ product }) {
    return (
        <GuestLayout
            header={
                <h2 className="text-xl font-semibold leading-tight">
                    Product Detail
                </h2>
            }
        >
            <Head title="Product Detail" />

            <div className="max-w-7xl mx-auto">
                <ProductCard key={product.id} product={product} />
            </div>
        </GuestLayout>
    );
}
