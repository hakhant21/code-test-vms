import { router, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
    const { data, setData, post, processing, errors } = useForm({
        quantity: 1,
    });

    const purchase = (e) => {
        e.preventDefault();
        post(route("purchase", product), {
            onSuccess: () => {
                toast.success('Product purchased successfully', {
                    onClose: () => {
                        router.visit(route("welcome"));
                    },
                });
            },
            onError: () => {
                toast.error('Product could not be purchased', {
                    onClose: () => {
                        router.visit(route("welcome"));
                    },
                });
            },
        });
    };

    return (
        <>
            <div className="border p-4 rounded shadow">
                <h2 className="font-semibold">{product.name}</h2>
                <p>${product.price}</p>
                <p>
                    Stock:{" "}
                    {product.quantity_avaliable < 0
                        ? "Out of stock"
                        : product.quantity_avaliable}
                </p>

                <form onSubmit={purchase} className="mt-2 flex gap-2">
                    <input
                        type="number"
                        min="1"
                        value={data.quantity}
                        onChange={(e) => setData("quantity", e.target.value)}
                        className="border rounded px-2 py-1 w-16"
                    />
                    {product.quantity_avaliable >= 1 && (
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                            Buy
                        </button>
                    )}
                    {errors.quantity && (
                        <p className="text-red-500">{errors.quantity}</p>
                    )}
                </form>
            </div>
        </>
    );
}
