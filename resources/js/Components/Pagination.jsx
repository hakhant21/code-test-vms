import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    if (links.length <= 3) return null;

    return (
        <nav className="w-full flex justify-end mt-6">
            <ul className="inline-flex items-center space-x-1">
                {links.map((link, index) => (
                    <li key={index}>
                        {link.url ? (
                            <Link
                                href={link.url}
                                className={`px-3 py-1 rounded text-sm font-medium transition ${
                                    link.active
                                        ? "bg-indigo-500 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span
                                className="px-3 py-1 rounded text-sm font-medium text-gray-400 bg-gray-50"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
