import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ transactions }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Transactions
                </h2>
            }
        >
            <Head title="Transactions" />

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
                                            Price Per Unit
                                        </th>
                                        <th className="p-2 border">
                                            Avaliable Quantity
                                        </th>
                                        <th className="p-2 border">
                                            Purchased Quantity
                                        </th>

                                        <th className="p-2 border">
                                            Total Price
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {transactions?.data?.map((transaction) => (
                                        <tr
                                            key={transaction.id}
                                            className="text-center"
                                        >
                                            <td className="p-2 border">
                                                {transaction.id}
                                            </td>
                                            <td className="p-2 border">
                                                {transaction.product.name}
                                            </td>
                                            <td className="p-2 border">
                                                {transaction.product.price}
                                            </td>
                                            <td className="p-2 border">
                                                {
                                                    transaction.product
                                                        .quantity_avaliable
                                                }
                                            </td>
                                            <td className="p-2 border">
                                                {transaction.quantity}
                                            </td>
                                            <td className="p-2 border">
                                                {transaction.total_price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {transactions.links && (
                                <div className="w-full mt-4">
                                    <Pagination links={transactions.links} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
