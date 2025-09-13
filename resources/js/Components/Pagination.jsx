// resources/js/Components/Pagination.jsx
import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    // Remove null values (previous/next)
    const validLinks = links.filter(link => link.url !== null);

    if (validLinks.length <= 3) {
        return null;
    }

    return (
        <nav className="flex items-center justify-between border-gray-200 px-4 sm:px-0">
            <div className="flex flex-1 w-0">
                {links[0].url && (
                    <Link
                        href={links[0].url}
                        className="cursor-pointer inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-100 hover:text-gray-300 hover:border-gray-300"
                        preserveState
                    >
                       Previous Page
                    </Link>
                )}
            </div>

            <div className="hidden md:-mt-px md:flex">
                {links.map((link, index) => {
                    if (index === 0 || index === links.length - 1) return null;

                    return (
                        <Link
                            key={index}
                            href={link.url}
                            className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                                link.active
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                            preserveState
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>

            <div className="flex flex-1 justify-end w-0">
                {links[links.length - 1].url && (
                    <Link
                        href={links[links.length - 1].url}
                        className="cursor-pointer inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-100 hover:text-gray-300 hover:border-gray-300"
                        preserveState
                    >
                        Next Page
                    </Link>
                )}
            </div>
        </nav>
    );
}
