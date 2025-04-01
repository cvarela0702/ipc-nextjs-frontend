'use client'

import { useParams } from 'next/navigation'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { Heart, Star, Clock, Users, Fire } from '@phosphor-icons/react'
import { useAuth } from '@/hooks/auth'

const formatTime = (hours, minutes) => {
    if (hours > 0) {
        return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
}

const RecipePage = () => {
    const params = useParams()
    const { user } = useAuth()
    const {
        data: recipe,
        error,
        isLoading,
        mutate,
    } = useSWR(`/api/recipes/slug/${params.slug}`, () =>
        axios
            .get(`/api/recipes/slug/${params.slug}`)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )

    const isFavorite = recipe?.favorites?.length > 0
    const favoriteId = recipe?.favorites?.[0]?.id

    const toggleFavorite = async () => {
        if (!user) return

        try {
            if (isFavorite) {
                // Remove favorite
                await axios.delete(`/api/favorites/${favoriteId}`)
            } else {
                // Add favorite
                await axios.post('/api/favorites', {
                    user_id: user.id,
                    recipe_id: recipe.id,
                })
            }
            // Refresh the recipe data
            await mutate()
        } catch (error) {
            console.error('Error toggling favorite:', error)
        }
    }

    if (isLoading)
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        )

    if (error)
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-red-500">
                    Error loading recipe: {error.message}
                </div>
            </div>
        )

    if (!recipe)
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-gray-500">Recipe not found</div>
            </div>
        )

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                {/* Head Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-4xl font-bold text-gray-900">
                            {recipe.title}
                        </h1>
                        {user && (
                            <button
                                onClick={toggleFavorite}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Heart
                                    weight={isFavorite ? "fill" : "regular"}
                                    className={isFavorite ? "text-red-500" : "text-gray-500"}
                                    size={32}
                                />
                            </button>
                        )}
                    </div>

                    {/* Image */}
                    {recipe.image_url && (
                        <div className="relative w-full h-[400px] mb-6 rounded-lg overflow-hidden">
                            <img
                                src={recipe.image_url}
                                alt={recipe.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Stats Bar */}
                    <div className="flex flex-wrap gap-6 items-center mb-8">
                        <div className="flex items-center gap-2">
                            <Heart
                                weight="fill"
                                className="text-red-500"
                                size={20}
                            />
                            <span className="text-gray-700">
                                {recipe.favorites_count}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star
                                weight="fill"
                                className="text-yellow-500"
                                size={20}
                            />
                            <span className="text-gray-700">
                                {recipe.ratings_avg?.toFixed(1) || '0.0'}
                            </span>
                            <span className="text-gray-500">
                                ({recipe.ratings_count})
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users
                                weight="fill"
                                className="text-blue-500"
                                size={20}
                            />
                            <span className="text-gray-700">
                                {recipe.servings} servings
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock
                                weight="fill"
                                className="text-green-500"
                                size={20}
                            />
                            <span className="text-gray-700">
                                {formatTime(
                                    recipe.cook_time_hours,
                                    recipe.cook_time_minutes,
                                )}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock
                                weight="fill"
                                className="text-purple-500"
                                size={20}
                            />
                            <span className="text-gray-700">
                                {formatTime(
                                    recipe.prep_time_hours,
                                    recipe.prep_time_minutes,
                                )}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Fire
                                weight="fill"
                                className="text-orange-500"
                                size={20}
                            />
                            <span className="text-gray-700">
                                {recipe.calories} calories
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Description */}
                    <div className="lg:col-span-2">
                        <div className="prose max-w-none">
                            <h2 className="text-2xl font-semibold mb-4">
                                Description
                            </h2>
                            <p className="text-gray-700 mb-8">
                                {recipe.description}
                            </p>

                            <h2 className="text-2xl font-semibold mb-4">
                                Ingredients
                            </h2>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="whitespace-pre-line text-gray-700">
                                    {recipe.ingredients}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Instructions and Video */}
                    <div className="lg:col-span-1">
                        <div className="prose max-w-none">
                            <h2 className="text-2xl font-semibold mb-4">
                                Instructions
                            </h2>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="whitespace-pre-line text-gray-700">
                                    {recipe.instructions}
                                </div>
                            </div>

                            {recipe.video_url && (
                                <div className="mt-8">
                                    <h2 className="text-2xl font-semibold mb-4">
                                        Video Tutorial
                                    </h2>
                                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                        <iframe
                                            src={recipe.video_url}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen></iframe>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecipePage
