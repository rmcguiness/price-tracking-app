'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddProduct() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        imageUrl: '',
        description: '',
        currentPrice: '',
        store: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // This would be replaced with an actual API call
            // const response = await fetch('/api/products', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(formData)
            // });

            // if (!response.ok) throw new Error('Failed to add product');

            // Mock successful submission
            console.log('Product added:', formData);

            // Redirect to products page
            router.push('/products');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
                        <p className="mt-2 text-gray-600">
                            Enter the product details to start tracking its price
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full h-10 border-1 rounded-md  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                                Product URL
                            </label>
                            <input
                                type="url"
                                id="url"
                                name="url"
                                required
                                value={formData.url}
                                onChange={handleChange}
                                className="mt-1 block w-full  h-10 border-1  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                                Image URL
                            </label>
                            <input
                                type="url"
                                id="imageUrl"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="mt-1 block w-full  h-10 border-1  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full  h-20 border-1  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="currentPrice" className="block text-sm font-medium text-gray-700">
                                Current Price
                            </label>
                            <input
                                type="number"
                                id="currentPrice"
                                name="currentPrice"
                                step="0.01"
                                required
                                value={formData.currentPrice}
                                onChange={handleChange}
                                className="mt-1 block w-full  h-10 border-1  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="store" className="block text-sm font-medium text-gray-700">
                                Store
                            </label>
                            <select
                                id="store"
                                name="store"
                                required
                                value={formData.store}
                                onChange={handleChange}
                                className="mt-1 block w-full  h-10 border-1  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Select a store</option>
                                <option value="amazon">Amazon</option>
                                <option value="walmart">Walmart</option>
                                <option value="bestbuy">Best Buy</option>
                                <option value="target">Target</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Link
                                href="/products"
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Adding...' : 'Add Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
