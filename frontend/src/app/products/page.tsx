import Link from 'next/link';
import ProductCard from './components/ProductCard';

// This will be replaced with actual data from the backend
const mockProducts = [
    {
        id: '1',
        name: 'Example Product 1',
        currentPrice: 99.99,
        store: 'Amazon',
        imageUrl: 'https://via.placeholder.com/150',
        description: 'This is a description of the product',
        priceHistory: [],
        url: 'https://www.amazon.com/product/1234567890',
    },
    {
        id: '2',
        name: 'Example Product 2',
        currentPrice: 149.99,
        store: 'Best Buy',
        imageUrl: 'https://via.placeholder.com/150',
        description: 'This is a description of the product',
        priceHistory: [],
        url: 'https://www.bestbuy.com/product/1234567890',
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
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
} 