import { Head, useForm, router } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import TextInput from "@/Components/TextInput";
import Pagination from "@/Components/Pagination";
import ProductCard from "@/Components/Products/ProductCard";

export default function Welcome({ products, filters }) {
    const handleSearch = (e) => {
        router.get(
            route("welcome"),
            { ...filters, search: e.target.value },
            { preserveState: true, replace: true }
        );
    };

    const handleSort = (field) => {
        let direction = "asc";

        if (filters.sort == field && filters.direction == "asc") {
            direction = "desc";
        }

        router.get(
            route("welcome"),
            { ...filters, sort: field, direction },
            { preserveState: true }
        );
    };

    return (
        <GuestLayout
            header={
                <h2 className="text-xl font-semibold leading-tight">
                    Product List
                </h2>
            }
        >
            <Head title="Product List" />
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-3 gap-4 py-12">
                    <TextInput
                        type="text"
                        className="border rounded px-2 py-1"
                        placeholder="Search"
                        value={filters.search || ""}
                        onChange={handleSearch}
                    />

                    <div className="flex gap-2">
                        <select
                            name="sort"
                            className="border rounded mx-2 py-1"
                            onChange={(e) => handleSort(e.target.value)}
                        >
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                            <option value="quantity_avaliable">Quantity Available</option>
                        </select>

                        <select
                            name="direction"
                            className="border rounded mx-2 py-1"
                            onChange={(e) => handleSort(e.target.value)}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {products.data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {products.meta.links && (
                    <div className="flex justify-end w-full">
                        <Pagination links={products.meta.links} />
                    </div>
                )}
                <div className="flex justify-end"></div>
            </div>
        </GuestLayout>
    );
}
