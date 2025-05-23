import Link from 'next/link';

export default function NavBar() {
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-xl font-bold text-gray-800">
                                PriceTracker
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                            <Link href="/products" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center">
                                Products
                            </Link>
                            <Link href="/analytics" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center">
                                Analytics
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}