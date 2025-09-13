import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function Edit({ product }) {
    const { data, setData, put, errors, processing } = useForm({
        name: product.name,
        price: product.price,
        quantity_avaliable: product.quantity_avaliable,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("products.update", product.id), {
            onSuccess: () => {
                toast.success('Product updated successfully', {
                    onClose: () => {
                        router.visit(route("products.index"));
                    },
                });
            },
            onError: () => {
                toast.error('Product could not be updated', {
                    onClose: () => {
                        router.visit(route("products.index"));
                    },
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Product Edit
                    </h2>
                    <Link
                        href={route("products.index")}
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                    >
                        Back
                    </Link>
                </div>
            }
        >
            <Head title="Product Edit" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={handleSubmit} method="POST">
                                <div className="mb-4">
                                    <InputLabel htmlFor="name" value="Product Name" className="dark:text-gray-100 py-2"/>
                                    <TextInput
                                        id="name"
                                        type="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full dark:bg-gray-700 py-2 px-2"
                                        autoComplete="name"
                                        placeholder='Jelly'
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <p className="text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <InputLabel htmlFor="price" value="Product Price" className="dark:text-gray-100 py-2"/>
                                    <TextInput
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full dark:bg-gray-700 py-2 px-2"
                                        autoComplete="price"
                                        placeholder="0.05"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                    />
                                    {errors.price && (
                                        <p className="text-red-500">
                                            {errors.price}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="quantity_avaliable"
                                        value="Product Quantity"
                                        className="dark:text-gray-100 py-2"
                                    />
                                    <TextInput
                                        id="quantity_avaliable"
                                        type="number"
                                        step="1"
                                        min="1"
                                        name="quantity_avaliable"
                                        value={data.quantity_avaliable}
                                        className="mt-1 block w-full dark:bg-gray-700 py-2 px-2"
                                        autoComplete="quantity_avaliable"
                                        placeholder="1"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData(
                                                "quantity_avaliable",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.quantity_avaliable && (
                                        <p className="text-red-500">
                                            {errors.quantity_avaliable}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <button type="submit" disabled={processing} className="bg-green-500 text-white px-3 py-1 rounded">
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
