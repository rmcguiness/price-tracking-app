import Link from 'next/link';

// This will be replaced with actual data from the backend
const mockProducts = [
    {
        id: '1',
        name: 'Example Product 1',
        currentPrice: 99.99,
        store: 'Amazon',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: '2',
        name: 'Example Product 2',
        currentPrice: 149.99,
        store: 'Best Buy',
        imageUrl: 'https://via.placeholder.com/150',
    },
];

export default function ProductsPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Tracked Products</h1>
                <Link
                    href="/products/add"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    Add Product
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {mockProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white overflow-hidden shadow rounded-lg"
                    >
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-16 w-16 rounded-md"
                                        src={product.imageUrl}
                                        alt={product.name}
                                    />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{product.store}</p>
                                    <p className="mt-1 text-xl font-semibold text-gray-900">
                                        ${product.currentPrice.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <Link
                                    href={`/products/${product.id}`}
                                    className="w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 