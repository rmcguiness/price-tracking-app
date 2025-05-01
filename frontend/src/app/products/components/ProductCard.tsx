import { Product } from "@/types/product";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
    return (
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
    )
}