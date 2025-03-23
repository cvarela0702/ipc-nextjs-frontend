'use client'

import axios from '@/lib/axios'
import useSWR from 'swr'
import { Heart, Star } from '@phosphor-icons/react'

const Recipes = () => {
    const {
        data: recipes,
        error,
        isLoading,
    } = useSWR('/api/recipes', () =>
        axios
            .get('/api/recipes')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k+'
        }
        return num.toString()
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Recipes</h1>
            
            {isLoading && <div>Loading recipes...</div>}
            {error && <div>Error loading recipes: {error.message}</div>}
            
            {recipes && recipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map(recipe => (
                        <div
                            key={recipe.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img
                                src={recipe.image_url}
                                alt={recipe.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    {recipe.title}
                                </h2>
                                <p className="text-gray-600 mb-2">
                                    {recipe.description}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        {formatNumber(recipe.favorites_count)}
                                        <Heart weight="fill" className="text-red-500" size={16} />
                                    </span>
                                    <span className="flex items-center gap-1">
                                        {recipe.ratings_avg?.toFixed(1) || '0.0'}
                                        <Star weight="fill" className="text-yellow-500" size={16} />
                                    </span>
                                    <span>({formatNumber(recipe.ratings_count)})</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">No recipes found</div>
            )}
        </div>
    )
}

export default Recipes
