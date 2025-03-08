'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
    const pathname = usePathname()

    return (
        <nav className="border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center space-x-8 py-3">
                    <Link
                        href="/fixtures"
                        className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                            pathname === '/fixtures'
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                        Fixtures
                    </Link>
                    <Link
                        href="/table"
                        className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                            pathname === '/table'
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                    >
                        League Table
                    </Link>
                </div>
            </div>
        </nav>
    )
}
