'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import axios from '@/lib/axios'

const CategoryNav = () => {
    const pathname = usePathname()

    const {
        data: categories,
        error,
        isLoading,
    } = useSWR('/api/categories', () =>
        axios
            .get('/api/categories')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )

    if (isLoading)
        return <div className="animate-pulse h-24 bg-gray-100 rounded-lg"></div>
    if (error)
        return <div className="text-red-500">Error loading categories</div>

    return (
        <nav className="bg-white shadow-sm rounded-lg p-4 mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categories?.map(category => {
                    const isActive = pathname === `/category/${category.slug}`

                    return (
                        <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className={`
                                group flex flex-col items-center p-3 rounded-lg transition-all duration-200
                                ${
                                    isActive
                                        ? 'bg-blue-50 ring-2 ring-blue-500'
                                        : 'hover:bg-gray-50 hover:scale-105'
                                }
                            `}>
                            <div className="relative w-16 h-16 mb-2">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover rounded-lg"
                                    sizes="(max-width: 64px) 100vw, 64px"
                                    onError={e => {
                                        e.target.style.display = 'none'
                                    }}
                                />
                            </div>
                            <span
                                className={`
                                text-sm font-medium text-center
                                ${isActive ? 'text-blue-700' : 'text-gray-700'}
                                group-hover:${isActive ? 'text-blue-800' : 'text-gray-900'}
                            `}>
                                {category.name}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}

export default CategoryNav
