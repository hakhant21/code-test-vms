import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function Index({ products }) {
    const { delete: destroy } = useForm();
    const handleDelete = (product) => {
        if (confirm("Are you sure you want to delete this product?")) {
            destroy(route("products.destroy", product.id), {
                onSuccess: () => {
                    toast.success("Product deleted successfully");
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Product List
                    </h2>
                    <Link
                        href={route("products.create")}
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                    >
                        Create
                    </Link>
                </div>
            }
        >
            <Head title="Product List" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full border">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-700">
                                        <th className="p-2 border">ID</th>
                                        <th className="p-2 border">
                                            Product Name
                                        </th>
                                        <th className="p-2 border">
                                            Product Price
                                        </th>
                                        <th className="p-2 border">
                                            Product Quantity
                                        </th>
                                        <th className="p-2 border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="text-center"
                                        >
                                            <td className="p-2 border">
                                                {product.id}
                                            </td>
                                            <td className="p-2 border">
                                                {product.name}
                                            </td>
                                            <td className="p-2 border">
                                                ${product.price}
                                            </td>
                                            <td className="p-2 border">
                                                {product.quantity_avaliable}
                                            </td>
                                            <td className="p-2 border">
                                                <div className="flex justify-center items-center">
                                                    <div className="">
                                                        <button
                                                            onClick={() => router.visit(route("products.show", product.id))}
                                                            className="py-1 px-2 rounded bg-indigo-500 mx-2 hover:bg-indigo-600"
                                                        >
                                                            Show
                                                        </button>
                                                    </div>
                                                    <div className="">
                                                        <button
                                                            onClick={() => router.visit(route("products.edit", product.id))}
                                                            className="py-1 px-2 rounded bg-yellow-500 mx-2 hover:bg-yellow-600"
                                                        >
                                                            Edit
                                                        </button>
                                                    </div>
                                                    <div className="">
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    product
                                                                )
                                                            }
                                                            className="py-1 px-2 rounded bg-red-500 mx-2 hover:bg-red-600"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {products.links && (
                                <div className="w-full mt-4">
                                    <Pagination links={products.links} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
